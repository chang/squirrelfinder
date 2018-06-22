# Squirrel Finder

Made for the Squirrels of IU.

### TODO
- deploy on digitalocean
- load MapBox as a component
- load JSON data
- `Label` for family members

### Instructions

Bootstrapped with [create-react-app](https://github.com/facebook/create-react-app).

```
  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!
```

### Theming

Since SquirrelFinder is built on top of SemanticUI React, we're using SemanticUI to theme the website. SemanticUI has a special setup tool with an included Gulpfile that builds the theme locallly. Since it needs to be imported in the app, it can be found under `src/resources/semantic`. To build the theme:

```
cd src/resources/semantic
gulp build
```

### Deployment

Probably going to use DigitalOcean.

```

```
