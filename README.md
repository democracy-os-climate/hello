# hello

a wordpress theme for our landing site

--------

> **early stage - currently boostraping the repo :grin:**

--------

## history

This [gulp](http://gulpjs.com/) app is based on the [gulp webapp generator](https://github.com/yeoman/generator-gulp-webapp) for [yeoman](http://yeoman.io/).

The goal is to be able :
- to develop and tweak the component of my wordpress template with whole npm & bower librairies,
- test it quickly on a few HTML mockups (the gulp `serve` task will not load a full wordpress :neutral-face:)
- build and pack it to be use in wordpress (might add a deploy feature soon)

**Notes :**  

The `test` features included in the generator have been disabled

-------

## install

pull the repo and execute :

```
npm install && bower install
```

> TODO : gulp global install

-------

## build

Since we use [gulp](http://gulpjs.com/) to play in your local environment, the following task are available :

### `gulp`
will build & pack the whole app in the `dist` folder

### `gulp serve`
will build the app and serve it on http://localhost:9000/

### `gulp serve:dist`
will serve the app as build in the `dist` folder on http://localhost:9000/
