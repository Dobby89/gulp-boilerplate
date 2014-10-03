'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');

// Default task
gulp.task('default', ['clean'], function (cb) {
  gulp.start('build', cb);
});
