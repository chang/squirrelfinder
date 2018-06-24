"""Generate Javascript code to load a Javascript object of squirrel images.

Tried to load images using all sorts of ways, but webpack didn't play nice with any pure JS solutions.

/squirrelfinder
    /scripts
        /images
            /Charlotte
                /...
            /Sampson
                /...

Running `python3 scripts/process_squirrel_image_paths` will perform the following actions:

1. Copy the image directories to `/src/assets/images`
2. Generate Javascript files files titled `{squirrelname}Images.js` under /src/assets/images importing
   the images and exporting a list of the images.
3. Generate a Javascript file titled `Images.js` consisting of the following object export.

{
    "Charlotte": ["/path/to/charlotte_1.jpg", ...],
    "Sampson": [...]
    ...
}
"""
import os
import shutil
from collections import defaultdict

from util import root_path


def clean_and_copy_images(in_dir, out_dir):
    if os.path.exists(out_dir):
        print('Removing: {}'.format(out_dir))
        shutil.rmtree(out_dir)

    print('Copying: {} => {}'.format(in_dir, out_dir))
    shutil.copytree(in_dir, out_dir)


def get_img_dict(dir_path):

    def _sanitize_paths(paths):
        return [p for p in paths if 'DS_Store' not in p and '.mov' not in p]

    img_dict = defaultdict(list)
    for squirrel_name in _sanitize_paths(os.listdir(dir_path)):
        img_dir_path = os.path.join(dir_path, squirrel_name)
        for img in _sanitize_paths(os.listdir(img_dir_path)):
            img_path = os.path.join(dir_path, squirrel_name, img)
            img_dict[squirrel_name].append(img_path)
    return img_dict


class LoadFile:
    PREAMBLE_MESSAGE = '/* THIS FILE WAS AUTOMATICALLY GENERATED. TO ADD IMAGES, FOLLOW THE DIRECTIONS IN `scripts/process_squirrel_images_paths.py` */'
    def __init__(self, base_path, img_dict):
        self.base_path = base_path
        self.img_dict = img_dict

    def write(self):
        for squirrel in self.img_dict:
            self._write_squirrel_load_file(squirrel)
        self._write_composite_load_file()

    def _write_composite_load_file(self):
        with open(os.path.join(self.base_path, 'Images.js'), 'w') as fp:
            fp.write(self.PREAMBLE_MESSAGE + '\n\n' + self._create_composite_load_file())

    def _write_squirrel_load_file(self, squirrel_name):
        load_file = self._create_squirrel_load_file(squirrel_name)
        file_path = os.path.join(self.base_path, '{}.js'.format(squirrel_name))
        with open(file_path, 'w') as fp:
            fp.write(self.PREAMBLE_MESSAGE + '\n\n' + load_file)

    def _create_composite_load_file(self):
        imports = []
        exports = []
        for squirrel in self.img_dict:
            var = '{}Images'.format(squirrel.replace(' ', ''))
            imports.append('import {} from "./{}.js"'.format(var, squirrel))
            exports.append('"{}": {}'.format(squirrel, var))
        imports_str = '\n'.join(imports)
        exports_str = '\n'.join([
            'export default {',
            '\n'.join(['\t{},'.format(e) for e in exports]),
            '}',
        ])
        return imports_str + '\n\n' + exports_str

    def _create_squirrel_load_file(self, squirrel_name):
        # imports
        imports = []
        image_variables = []
        for i, img_path in enumerate(self.img_dict[squirrel_name]):
            _, rel_path = img_path.split(self.base_path)
            rel_path = './{}'.format(rel_path.strip('/'))

            image_var = '{squirrel_name}_{i}'.format(
                squirrel_name=squirrel_name,
                i=i,
            )
            clean_image_var = image_var.replace(' ', '_').lower()

            import_line = 'import {image_var} from "{path}"'.format(
                image_var=clean_image_var,
                path=rel_path
            )

            image_variables.append(clean_image_var)
            imports.append(import_line)
        imports_str = '\n'.join(imports)

        export = '\n'.join([
            'export default [\n'
            '{image_variables}'
            '\n]'
        ])
        export_str = export.format(image_variables='\n'.join(['\t{},'.format(x) for x in image_variables]))

        return imports_str + '\n\n' + export_str


if __name__ == "__main__":
    IN_DIR = root_path('squirrel_data/images')
    OUT_DIR = root_path('src/assets/images')

    clean_and_copy_images(IN_DIR, OUT_DIR)
    img_dict = get_img_dict(OUT_DIR)
    lf = LoadFile(OUT_DIR, img_dict)
    lf.write()
