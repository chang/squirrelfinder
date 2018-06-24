# Squirrel Finder

Made for the Squirrels of IU.

Currently deployed on DigitalOcean (http://204.48.21.204:5000/).


```
# to build
make

# to preprocess data
make data
```

## Building

Building the website requires all squirrel data to be placed in the correct locations. `SquirrelFinder` needs 3 types of data:

- Squirrel facts: `squirrelFacts.json`
- Squirrel geographical data: `squirrelGeoData.json`

### Deploy

From the project root, run:

```
source scripts/deploy.sh
```

### Develop

Bootstrapped with [create-react-app](https://github.com/facebook/create-react-app).

```
npm start
    Starts the development server.

npm run build
    Bundles the app into static files for production.
```

### Theming

Since SquirrelFinder is built on top of SemanticUI React, we're using SemanticUI to theme the website. SemanticUI has a special setup tool with an included Gulpfile that builds the theme locallly. Since it needs to be imported in the app, it can be found under `src/assets/semantic`. To build the theme:

```
cd src/assets/semantic
gulp build
```
