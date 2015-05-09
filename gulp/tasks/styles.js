'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var handleErrors = require('../helpers/handleErrors');

/**
 * Compile website Sass using compass
 *
 * Also uses autoprefixer, so no need for compass mixins
 *
 * Usage: gulp styles
 */
gulp.task('styles-compass', function () {
  return gulp.src('src/styles/**/*.scss')
    .pipe($.compass({
      project: path.join(__dirname, '../', 'src'),
      css: '../dist/styles', // The target directory where you keep your css stylesheets. It is relative to the project option.
      sass: 'styles', // The source directory where you keep your sass stylesheets. It is relative to the project option.
//      require: ['compass-normalize'], // include any ruby gems here, so compass knows to require them
      import_path: '../bower_components', // The directory where you keep external Compass plugins or extensions that you would like to make available using the @import function. Common use case would be setting this to your bower_components directory for example. It is relative to the project option.
      logging  : false,
      comments : false,
      style: 'expanded', // e.g. nested, expanded, compact, or compressed
      sourcemap: false
    }))
    // catch any compilation errors and output to the console and a popup to stop the process needing to be restarted every time there's an error
    .on('error', handleErrors)
    .pipe($.autoprefixer('last 2 version'))
    // catch any compilation errors and output to the console and a popup to stop the process needing to be restarted every time there's an error
    .on('error', handleErrors)
    .pipe($.size({title: 'main.css'}))
    .pipe(gulp.dest('dist/styles'));
});

/**
 * Compile website Sass using gulp-sass
 *
 * Uses libsass, which is apparently ~10x faster than ruby!
 *
 * This means you don't need to install Ruby gems because this is a node/gulp implementation of the sass compiler.
 *
 * Usage: gulp styles-libsass
 */
gulp.task('styles', function () {
  return gulp.src('src/styles/**/*.scss')
    .pipe($.sass({
      // See https://github.com/sass/node-sass for full list of parameter references
      includePaths: ['./bower_components'],  // so the compiler knows to look for scss files within the bower directory as well
      outputStyle: 'nested', // 'nested' or 'compressed' ('expanded' and 'compact' are not currently supported by libsass)
      sourceComments: 'none' // 'none', 'normal' or 'map'
    }))
    .on('error', handleErrors)
    .pipe($.pleeease({ // http://pleeease.io/docs/
      autoprefixer: ["last 4 versions", "ios 6"],
      filters: {oldIE: false},
      rem: ["16px", {replace: false, atrules: false}],
      pseudoElements: true,
      opacity: true,

      import: true,
      minifier: false,
      //minifier: {preserveHacks: true, removeAllComments: false},
      mqpacker: false,

      sourcemaps: false,

      next: false
    }))
    .pipe($.size({title: 'main.css'}))
    .pipe(gulp.dest('dist/styles'));
});
