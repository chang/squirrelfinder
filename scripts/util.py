import os


def root_dir():
    scripts_path = os.path.dirname(os.path.abspath(__file__))
    return os.path.dirname(scripts_path)


def root_path(*args):
    return os.path.join(root_dir(), *args)
