'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

/**
 * Clean output directories
 *
 * Gets rid of all the folders and files created by `gulp build` and `gulp watch`
 *
 * Usage: gulp clean
 */
gulp.task('clean', function () {
  return gulp.src([
    'dist',
    'src/.sass-cache',
    'src/styles/fonts/_iconfont.scss',
    'src/fonts/iconfont.eot',
    'src/fonts/iconfont.svg',
    'src/fonts/iconfont.ttf',
    'src/fonts/iconfont.woff',
    'src/styles/sprite/_sprite.scss'
  ]).pipe($.rimraf());
});
