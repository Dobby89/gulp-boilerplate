'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var config = require('../config').iconFont;
var handleErrors = require('../helpers/handleErrors');

/**
 * Iconfont generator
 *
 * Converts .svg files into font files (.svg, .ttf, .eot, .woff)
 * with automatically assigned unicode character values for each .svg icon found.
 *
 * You can optionally prefix the icon filenames with a unicode character, e.g. `uE00A-chevron.svg`
 * which will be assigned to that character in the generated font and referenced as `content: 'E00A'` in the CSS.
 *
 * If no unicode character prefixed, the plugin will generate one for it and resave the file.
 *
 * Also generates an .scss file with pre-made icon classes referencing each character of the generated font
 *
 * Usage: $ gulp iconfont
 */

gulp.task('iconfont', function(callback) {
  runSequence(
    ['cleanTempIcons'],
    ['copyTempIcons'],
    ['generateIcons'],
    ['cleanTempIcons'],
    callback);
});

gulp.task('generateIcons', function(){

  return gulp.src(config.src) // the location of all the svg files to be created into the font
    .pipe($.iconfont(config.options))
      .on('codepoints', function(codepoints, options) {
        codepoints.forEach(function(glyph, idx, arr) {
          arr[idx].codepoint = glyph.codepoint.toString(16); // automatically assign a unicode value to the icon
        });

        // merge the codepoint options with the object from config.js
        config.template.options['glyphs'] = codepoints;
        config.template.options['fontName'] = options.fontName;

        gulp.src(config.template.src) // a template scss file, used to generate the scss code for all the icons
          .pipe($.consolidate('lodash', config.template.options))
          .pipe($.rename(config.template.sassPartialName)) // rename the generated scss filename, otherwise it inherits the filename of the template scss file
          .pipe(gulp.dest(config.template.dist)); // directory to save the generated scss file (absolute path)
      })
      .pipe(gulp.dest(config.dist)); // where to save the generated font files (absolute path)
});

gulp.task('cleanTempIcons', function(){
  return gulp.src(config.copyDist)
    .pipe($.rimraf());
});

gulp.task('copyTempIcons', function(){
  return gulp.src(config.copySrc)
    .pipe(gulp.dest(config.copyDist));
});
