'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
var config = require('../config').styles;
var handleErrors = require('../helpers/handleErrors');

var pleaseOptions = config.pleaseOptions;

/**
 * Compile website Sass using gulp-sass
 *
 * Uses libsass, which is apparently ~10x faster than ruby!
 *
 * Usage: gulp styles
 */
gulp.task('styles', function () {
  return gulp.src(config.src)
    .pipe($.sass.sync(config.settings)
    .on('error', $.sass.logError))
    .on('error', handleErrors)
    .pipe($.pleeease(argv.prod === undefined ? pleaseOptions.development : pleaseOptions.production))
    .pipe($.size({title: 'Styles complete'}))
    .pipe(gulp.dest(config.dist));
});
