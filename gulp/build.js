'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var handleErrors = require('./helpers/handleErrors');
var runSequence = require('run-sequence');

/**
 * Build tasks
 *
 * Runs all the build tasks in this file from one command.
 *
 * Usage: gulp build
 */
//gulp.task('build', ['sprite', 'iconfont', 'styles', 'scripts', 'copyfonts', 'copysvg', 'copyimages']);
gulp.task('build', function(callback) {
  runSequence(
    ['sprite', 'iconfont', 'scripts'],
    ['copyfonts', 'styles', 'copysvg', 'copyimages'],
    callback);
});

/**
 * Copy fonts needed for the website
 *
 * Usage: gulp copyfonts
 */
gulp.task('copyfonts', function () {
  return gulp.src([
      'src/fonts/**/*.*'
    ])
    .pipe(gulp.dest('dist/fonts'));
});

/**
 * Copy svgs into /dist
 *
 * Usage: gulp copysvg
 */
gulp.task('copysvg', function () {
  return gulp.src('src/svg/**/*.svg')
    .pipe(gulp.dest('dist/svg'));
});

/**
 * Copy images into /dist
 *
 * Usage: gulp copyimages
 */
gulp.task('copyimages', function () {
  return gulp.src('src/images/**/*.{jpg,png,gif}')
    .pipe(gulp.dest('dist/images'));
});
