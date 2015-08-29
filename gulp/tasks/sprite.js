'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var svgspritesheet = require('gulp-svg-spritesheet');
var config = require('../config').sprite;
var handleErrors = require('../helpers/handleErrors');
var runSequence = require('run-sequence');

/**
 * Sprite generator
 *
 * Converts .svg files into an .svg sprite sheet (with a .png fallback for IE8)
 *
 * Also generates an .scss file with pre-made icon classes referencing each icon from the sheet
 *
 * Usage: $ gulp sprite
 */
gulp.task('sprite', function(callback) {
  runSequence(
    ['cleanTempSpriteIcons'],
    ['copyTempSpriteIcons'],
    ['sprite-normal'],
    ['sprite-retina'],
    ['cleanTempSpriteIcons'],
    callback);
});

gulp.task('sprite-normal', function () {
  return gulp.src(config.src)
    .pipe(svgspritesheet(config.options))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.svgDist))
    .pipe($.svg2png())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.pngDist));
});

gulp.task('sprite-retina', function () {
  return gulp.src(config.svgDist)
    .pipe($.svg2png([2]))
    .pipe($.rename(config.retina.name))
    .pipe(gulp.dest(config.retina.dist));
});

gulp.task('cleanTempSpriteIcons', function(){
  return gulp.src(config.copyDist)
    .pipe($.rimraf());
});

gulp.task('copyTempSpriteIcons', function(){
  return gulp.src(config.copySrc)
    .pipe(gulp.dest(config.copyDist));
});
