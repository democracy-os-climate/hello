// generated on 2015-10-20 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import ftp from 'vinyl-ftp' ;
import del from 'del';
import {stream as wiredep} from 'wiredep';
import pngcrush from 'imagemin-pngcrush' ;


const $ = gulpLoadPlugins();
const reload = browserSync.reload;

import fs from 'fs';
let info = JSON.parse(fs.readFileSync('./package.json'));

import jade from 'jade';
import phpjade from 'phpjade';
phpjade.init(jade);

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}

gulp.task('lint', lint('app/scripts/**/*.js'));

gulp.task('html', ['views', 'styles'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', '.tmp/includes', 'app', '.']});

  return gulp.src(['app/*.html', '.tmp/**/*.html', '.tmp/**/*.php'])
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('views', () => {
  return gulp.src(['app/**/*.jade', '!app/layouts/**'])
    .pipe($.jade({
      jade: jade,
      usestrip: true,
      pretty: true,
      prefunction: function(input,options) {
        return input.replace(/###/, 'hello');
      }
    }))
    .pipe($.if('*.php.html', $.rename({ extname: '' })))
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({stream: true}));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}],
      use: [pngcrush({reduce: true})],
    }))
    .on('error', (err) => {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('.tmp/images'))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}',
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/**/*',
    '!app/{layouts,layouts/**}',
    '!app/{images,images/**}',
    '!app/{fonts,fonts/**}',
    '!app/**/*.html',
    '!app/**/*.scss',
    '!app/**/*.jade',
  ], {
    dot: true,
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));
gulp.task('clean:modules', del.bind(null, ['bower_components', 'node_modules']));
gulp.task('clean:all', ['clean', 'clean:modules'], () => {
  console.log('you need to run the following command before the next build :');
  console.log('npm install && bower install');
});

gulp.task('serve', ['views', 'styles', 'fonts', 'images'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components',
      },
      'index': 'mockup.html',
    },
  });

  gulp.watch([
    'app/*.html',
    '.tmp/**/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*',
  ]).on('change', reload);

  gulp.watch('app/**/*.jade', ['views']);
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist'],
      'index': 'mockup.html',
    },
  });
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/,
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src(['app/layouts/*.jade'])
    .pipe(wiredep({
      exclude: ['jquery', 'bootstrap-sass', 'modernizr'],
      ignorePath: /^(\.\.\/)*\.\./,
    }))
    .pipe(gulp.dest('app/layouts/'));
});

let config = JSON.parse(fs.readFileSync('./.deployrc'));

function getDeployStream(configSet){

  if(!fs.statSync('./.deployrc').isFile()) {
    throw new $.util.PluginError({
      plugin: 'deploy',
      message: '.deployrc config file not found'
    });
  } else {

    return ftp.create( {
        host:     configSet.host,
        port:     configSet.port,
        user:     configSet.user,
        password: configSet.password,
        log:      $.util.log
    });

  }
}

gulp.task( 'deploy:prod', ['build'], () => {

  let conn = getDeployStream(config.prod) ;

  return gulp.src( 'dist/**' ,{
    base: 'dist',
    buffer: false
  }).pipe( conn.dest( config.prod.path ) );

}) ;

gulp.task( 'deploy:dev', ['build'], () => {

  let conn = getDeployStream(config.dev) ;

  return gulp.src( 'dist/**' ,{
    base: 'dist',
    buffer: false
  }).pipe( conn.dest( config.dev.path ) );

}) ;

gulp.task( 'deploy:watch', () => {

  let conn = getDeployStream(config.dev) ;

  let up = (file,base) => {
    return gulp.src( [file], { base: base, buffer: false } )
      .pipe( conn.newer( config.dev.path ) ) // only upload newer files
      .pipe( conn.dest( config.dev.path ) )
    ;
  };

  gulp.watch(['.tmp/**/*']).on('change', (event) => {
    console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);
    return up(event.path,'.tmp') ;
  });

  gulp.watch([
    'app/**/*',
    '!app/{layouts,layouts/**}',
    '!app/{images,images/**}',
    '!app/{fonts,fonts/**}',
    '!app/**/*.html',
    '!app/**/*.scss',
    '!app/**/*.jade',
  ]).on('change', (event) => {
    console.log('Changes detected! Uploading file "' + event.path + '", ' + event.type);
    return up(event.path,'app') ;
  });

}) ;

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
