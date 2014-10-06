'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

function browserSyncInit(files, browser) {
  var browserSync = require('browser-sync');
  browser = browser === undefined ? 'default' : browser;

  /**
   * Uncomment whichever suits your needs
   */

  // Static files
  browserSync.init(files, {
    server: {
      baseDir: "./"
    },
    browser: browser,
    notify: false
  });

  // or...

//  browserSync.init(files, {
//    proxy: '127.0.0.1:8000', // or something like "yourlocal.dev"
//    browser: browser,
//    notify: false
//  });
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
