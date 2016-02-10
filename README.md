# hello

just another wordpress theme

--------

> **early stage - currently bootstraping the repo :grin:**

--------

## history

This [gulp](http://gulpjs.com/) app is based on the [gulp webapp generator](https://github.com/yeoman/generator-gulp-webapp) for [yeoman](http://yeoman.io/).

**Notes :**  

The `test` features included in the generator have been disabled.

The [jade](http://jade-lang.com/) template engine was added for the mockups generation.  
(the following [recipe](https://github.com/yeoman/generator-gulp-webapp/blob/master/docs/recipes/jade.md) was used)

> TODO : add deploy

-------

## install

1. pull the repo using git (if you just download the ZIP file instead, don't forget to `git init`)
2. install gulp globally
```
npm install -g gulp
```
(_might require a `sudo`_)
3. install node modules (building libraries) and bower component (front end libraries) locally
```
npm install && bower install
```
4. create a file named `.deployrc` at the root of your working directory and fill it using this template
```json
{
    "dev": {
      "host": "ftp.your-awesome-server.com",
      "port": "21",
      "user": "awesome-ftp-user",
      "password": "awesome-ftp-password",
      "path": "/dev/wp-content/themes/hello"
    },
    "prod": {
      "host": "ftp.your-awesome-server.com",
      "port": "21",
      "user": "awesome-ftp-user",
      "password": "awesome-ftp-password",
      "path": "/www/wp-content/themes/hello"
    }
}
```
**_do not sync this file and leave it in the `.gitignore` config file_**
-------

## build

Since we use [gulp](http://gulpjs.com/) to play in your local environment, the following task are available :

### `gulp`
will build & pack the whole app in the `dist` folder

### `gulp serve`
will build the app and serve it on http://localhost:9000/

### `gulp deploy:dev` (beta)
deploy the template code (`dist` folder) to your development ftp server (see `.deployrc`)

### `gulp deploy:watch` (beta)
watch and deploy to your development ftp server :thumbsup:

### `gulp deploy:prod` (beta)
deploy the template code (`dist` folder) to your **production** ftp server (see `.deployrc`)

-------
