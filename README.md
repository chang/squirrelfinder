# Squirrel Finder

Made for the Squirrels of IU.

### Run a test server

```
cd squirrelfinder
live-server
```

### API Keys

Place the required API keys in a `/.env`.

```
GOOGLE_MAPS_API_KEY=...
MAPBOX_API_KEY=...
```

### Data

New squirrels should be added under `data/squirrels.json`. If coordinates are in DMS form, use `scripts/convert_coordinates.py` to convert to latitude and longitude coordinates.
