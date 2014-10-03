'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

function browserSyncInit(files, browser) {
  var browserSync = require('browser-sync');
  browser = browser === undefined ? 'default' : browser;

  browserSync.init(files, {
    proxy: '127.0.0.1:8000',
    browser: browser,
    notify: false
  });
}

/**
 * Serve files with browsersync
 *
 * Usage: gulp serve
 */
gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    'static/dist/**/*.css',
    'static/dist/**/*.js'
  ]);
});
