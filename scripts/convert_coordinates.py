"""Convert latitude and longitude coordinates."""
import os
import json
from copy import deepcopy

from geopy.point import Point


def load_dotenv(path):
    with open(path, 'r') as fp:
        lines = fp.readlines()
    
    env_vars = {}
    for line in lines:
        if "=" not in line:
            continue
        try:
            key, value = line.strip().split("=")
        except:
            raise ValueError('.env file formatted incorrectly: {}'.format(line))
        env_vars[key] = value

    return env_vars


def convert_dms_to_decimal_degrees(coordinate):
    """Recursively convert all DMS formatted coordinates to decimal degrees."""
    assert len(coordinate) == 2, 'Input should be an iterable with 2 elements'
    p = Point(' '.join(coordinate))
    lat, long, _ = p
    return [lat, long]


def convert_all(squirrel_data):
    dat = deepcopy(squirrel_data)
    for key in dat:
        _convert_all(dat[key])
    return dat


def _convert_all(dat):
    if isinstance(dat, dict):
        for key in dat:
            _convert_all(dat[key])
    elif isinstance(dat, list):
        is_coordinate = isinstance(dat[0], str) and dat[0].endswith('N') and dat[1].endswith('W')
        if is_coordinate:
            lat, long = convert_dms_to_decimal_degrees(dat)
            # reverse longitude and latitude here since MapBox uses them reversed for some reason
            dat[0], dat[1] = long, lat
        elif isinstance(dat[0], list):
            for d in dat:
                _convert_all(d)
            


def get_root_dir():
    curr_dir, _ = os.path.split(os.path.abspath(__file__))
    root_dir, _ = os.path.split(curr_dir)
    return root_dir


if __name__ == "__main__":
    root_dir = get_root_dir()
    data_path = os.path.join(root_dir, 'data', 'squirrels_dms.json')
    out_path = os.path.join(root_dir, 'data', 'squirrels.json')

    with open(data_path, 'r') as fp:
        squirrel_data_str = fp.read()
    squirrel_data = json.loads(squirrel_data_str)

    converted_squirrel_data = convert_all(squirrel_data)
    converted_squirrel_data_str = json.dumps(converted_squirrel_data, indent=4)

    with open(out_path, 'w') as fp:
        fp.write(converted_squirrel_data_str)

    print(converted_squirrel_data_str)
    print('Converted data written to: {}'.format(out_path))
    
