'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var handleErrors = require('../helpers/handleErrors');

/**
 * Concatenate website main scripts using browserify
 *
 * Usage: gulp scripts
 */
gulp.task('scripts', function () {
  return gulp.src(['src/scripts/main.js'], { read: false })
    .pipe($.browserify({
      insertGlobals: false,
      transform: ['debowerify'],
      shim: {
        'jquery.uniform': {
          path: 'bower_components/jquery.uniform/jquery.uniform.js',
          exports: null,
          depends: {
            jquery: 'jQuery'
          }
        }
      }
    }))
    // catch any compilation errors and output to the console and a popup to stop the process needing to be restarted every time there's an error
    .on('error', handleErrors)
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size({title: 'main.js'}));
});
