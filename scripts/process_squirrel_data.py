"""Process and validate raw .csv files of squirrel data and output as a JSON."""
import json
import pandas as pd
from collections import defaultdict

from convert_coordinates import convert_dms_to_decimal_degrees
from util import root_path


def read_csv_write_dict(func):
    def decorated(path):
        df = pd.read_csv(path)
        assert 'squirrel' in df.columns, 'Each spreadsheet must have "squirrel" as the primary key.'
        df['squirrel'] = df['squirrel'].map(lambda x: x.strip())
        df = df.set_index('squirrel')
        result = func(df)
        return dict(result)
    return decorated


def strip_whitespace(collection):
    """Recursively strip whitespace from all strings in a dictionary."""
    if isinstance(collection, dict):
        for key in collection:
            if isinstance(collection[key], int):
                continue
            elif isinstance(collection[key], str):
                collection[key] = collection[key].strip()
            else:
                strip_whitespace(collection[key])

    elif isinstance(collection, list):
        for i in range(len(collection)):
            if isinstance(collection[i], list):
                strip_whitespace(collection[i])
            elif isinstance(collection[i], str):
                collection[i] = collection[i].strip()


@read_csv_write_dict
def process_basic_info(df):
    """Read from basic_info.csv and output a dictionary of sanitized basic info."""
    info = defaultdict(dict)
    for squirrel, row in df.iterrows():
        assert row['sex'].upper() in ('M', 'F')

        info[squirrel]['sex'] = row['sex']
        info[squirrel]['birth_year'] = int(row['birth_year'])
        info[squirrel]['death_year'] = int(row['death_year']) if not pd.isnull(row['death_year']) else None
        info[squirrel]['personality'] = row['personality']
        info[squirrel]['likes'] = [l.lower() for l in row['likes'].strip().replace('.', ',').split(',') if len(l) > 0]

        if pd.isnull(row['dislikes']):
            info[squirrel]['dislikes'] = None
        else:
            info[squirrel]['dislikes'] = [d.lower() for d in row['dislikes'].strip().replace('.', ',').split(',') if len(d) > 0]

        info[squirrel]['trivia'] = row['trivia'] if not pd.isnull(row['trivia']) else None

    return info

@read_csv_write_dict
def process_family_data(df):
    info = defaultdict(list)
    for squirrel, row in df.iterrows():
        family_entry = {
            'name': row['family'],
            'relation': row['relation'],
        }
        info[squirrel].append(family_entry)

    return info


def sanitize_geo_data(geo_data_path):
    df = pd.read_csv(geo_data_path)
    df['coordinate'] = df['coordinate'].map(lambda x: x.replace('·', ' ').strip())
    df.to_csv(geo_data_path, encoding='utf-8')


@read_csv_write_dict
def process_geo_data(df):
    info = defaultdict(dict)
    for squirrel, row in df.iterrows():
        north, west = row['coordinate'].split()
        dd_coord = convert_dms_to_decimal_degrees((north, west))
        if row['type'] == 'favorite_spot':
            info[squirrel]['favorite_spot'] = dd_coord
        elif row['type'] == 'territory':
            if 'territory' not in info[squirrel]:
                info[squirrel]['territory'] = []
            info[squirrel]['territory'].append(dd_coord)
    return info


def sanitize_unicode(s, replacements):
    for replacement in replacements:
        uni, rep = replacement
        s = s.replace(uni, rep)
    return s


if __name__ == "__main__":
    OUT_PATH = root_path('src/assets/squirrelData.json')

    basic_info_path = root_path('squirrel_data', 'basic_info.csv')
    family_data_path = root_path('squirrel_data', 'family.csv')
    geo_data_path = root_path('squirrel_data', 'geographical.csv')

    basic_info = process_basic_info(basic_info_path)
    family_data = process_family_data(family_data_path)
    geo_data = process_geo_data(geo_data_path)

    # join dictionaries
    info = basic_info
    for squirrel, geo_data in geo_data.items():
        if squirrel in info:
            info[squirrel]['geo'] = geo_data

    for squirrel, family_data in family_data.items():
        if squirrel in info:
            info[squirrel]['family'] = family_data

    strip_whitespace(info)

    # create and write json
    json_str = json.dumps(info, indent=2)
    unicode_replacements = (
        ('\\u2018', "'"),
        ('\\u2019', "'"),
        ('\\u201c', "'"),
        ('\\u201d', "'"),
        ('\\u2026', ","),
        ('\\u2013', ""),
    )
    json_str = sanitize_unicode(json_str, unicode_replacements)

    with open(OUT_PATH, 'w') as fp:
        fp.write(json_str)

    print('Squirrel data JSON written to: {}'.format(OUT_PATH))
