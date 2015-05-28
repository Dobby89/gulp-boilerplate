'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var handleErrors = require('../helpers/handleErrors');

var pleaseOptions = {
  production : {
    autoprefixer: ["last 4 versions", "ios 6"],
    filters: false,
    rem: ["16px", {replace: false, atrules: false}],
    pseudoElements: true,
    opacity: true,
    import: true,
    minifier: {preserveHacks: true, removeAllComments: true},
    mqpacker: true,
    sourcemaps: false,
    next: false
  },
  development: {
    autoprefixer: ["last 2 versions"],
    minifier: false,
    sourcemaps: true
  }
}

/**
 * Compile website Sass using gulp-sass
 *
 * Uses libsass, which is apparently ~10x faster than ruby!
 *
 * Usage: gulp styles
 */
gulp.task('styles', function () {
  return gulp.src('src/styles/**/*.scss')
    .pipe($.sass.sync({
      // See https://github.com/sass/node-sass for full list of parameter references
      includePaths: ['./bower_components'],  // so the compiler knows to look for scss files within the bower directory as well
      outputStyle: 'compressed', // nested, expanded, compact, compressed
      sourceComments: 'none' // 'none', 'normal' or 'map'
    })
    .on('error', $.sass.logError))
    .on('error', handleErrors)
    .pipe($.pleeease(argv.prod === undefined ? pleaseOptions.development : pleaseOptions.production))
    .pipe($.size({title: 'main.css'}))
    .pipe(gulp.dest('dist/styles'));
});
