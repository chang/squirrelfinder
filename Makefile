all: images jsondata website

data: images jsondata

images:
	python3 scripts/process_squirrel_images_paths.py

jsondata:
	python3 scripts/process_squirrel_data.py

website:
	npm run build \
	tar cf build.tar build
