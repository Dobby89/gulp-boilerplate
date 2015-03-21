'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var dir = requireDir('./gulp', {recurse: true});

// Default task
gulp.task('default', ['clean'], function (cb) {
  gulp.start('build', cb);
});
