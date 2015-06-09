'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// set up the config objects
var config = require('../config');
var configPaths = config.paths;
var configIconFont = config.iconFont;
var configSprite = config.sprite;

/**
 * Clean output directories
 *
 * Gets rid of all the folders and files created by `gulp build` and `gulp watch`
 *
 * Usage: gulp clean
 */
gulp.task('clean', function () {
  return gulp.src([
    configPaths.dist,
    configPaths + '/.sass-cache',
    configIconFont.template.dist + configIconFont.template.sassPartialName,
    configSprite.options.templateDest
  ]).pipe($.rimraf());
});
