'use strict';

var gulp = require('gulp');

/**
 * Watch website files for changes
 *
 * Usage: gulp watch
 */
gulp.task('watch', ['styles', 'scripts', 'copysvg', 'copyimages'], function () {
  gulp.watch('static/styles/**/*.scss', ['styles']);
  gulp.watch('static/scripts/**/*.js', ['scripts']);
  gulp.watch('static/svg/**/*.svg', ['copysvg']);
  gulp.watch('static/images/**/*.*', ['copyimages']);
});

/**
 * Watch ONLY style files
 *
 * Useful if you don't want to wait around
 *
 * Usage: gulp watch:styles
 */
gulp.task('watch:styles', ['styles'], function () {
  gulp.watch('static/styles/**/*.scss', ['styles']);
});

/**
 * Watch ONLY script files
 *
 * Useful if you don't want to wait around
 *
 * Usage: gulp watch:scripts
 */
gulp.task('watch:scripts', ['scripts'], function () {
  gulp.watch('static/scripts/**/*.js', ['scripts']);
});
