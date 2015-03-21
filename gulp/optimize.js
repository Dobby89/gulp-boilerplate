'use strict';

var gulp = require('gulp');
var path = require('path');
var pngcrush = require('imagemin-pngcrush');

var $ = require('gulp-load-plugins')();

// `$ gulp optimize` should only be run if new svgs or images are added to the static directory before committing

/**
 * Frontend optimization tasks
 *
 * Usage: gulp optimize
 */
gulp.task('optimize', ['optimizesvg', 'optimizeimages']);

/**
 * Compress svgs needed for the website
 *
 * Usage: optimizesvg
 */
gulp.task('optimizesvg', function () {
  return gulp.src('src/svg/**/*.*')
    .pipe($.imagemin({
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('src/svg'));
});

/**
 * Compress images needed for the website
 *
 * Usage: gulp optimizeimages
 */
gulp.task('optimizeimages', function () {
  return gulp.src('src/images/**/*.*')
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest('src/images'));
});
