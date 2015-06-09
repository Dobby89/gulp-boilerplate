'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var svgspritesheet = require('gulp-svg-spritesheet');
var config = require('../config').sprite;
var handleErrors = require('../helpers/handleErrors');

/**
 * Sprite generator
 *
 * Converts .svg files into an .svg sprite sheet (with a .png fallback for IE8)
 *
 * Also generates an .scss file with pre-made icon classes referencing each icon from the sheet
 *
 * Usage: $ gulp sprite
 */
gulp.task('sprite', function () {
  return gulp.src(config.src)
    .pipe(svgspritesheet(config.options))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.svgDist))
    .pipe($.svg2png())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.pngDist));
});
