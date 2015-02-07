'use strict';

var gulp = require('gulp');

/**
 * Watch website files for changes
 *
 * Usage: gulp watch
 */
gulp.task('watch', ['build'], function () {
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/svg/**/*.svg', ['copysvg']);
  gulp.watch('src/images/**/*.{jpg,png,gif}', ['copyimages']);
});

/**
 * Watch ONLY style files
 *
 * Useful if you don't want to wait around
 *
 * Usage: gulp watch:styles
 */
gulp.task('watch:styles', ['styles'], function () {
  gulp.watch('src/styles/**/*.scss', ['styles']);
});

/**
 * Watch ONLY script files
 *
 * Useful if you don't want to wait around
 *
 * Usage: gulp watch:scripts
 */
gulp.task('watch:scripts', ['scripts'], function () {
  gulp.watch('src/scripts/**/*.js', ['scripts']);
});
