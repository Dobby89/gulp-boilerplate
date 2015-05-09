'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var handleErrors = require('../helpers/handleErrors');

/**
 * Compile website Sass using gulp-sass
 *
 * Uses libsass, which is apparently ~10x faster than ruby!
 *
 * Usage: gulp styles
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
