'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
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
var fontName = 'iconfont'; // the filename of the generated font files
var fontPath = '../fonts/'; // path to font directory, relative to the production CSS file
var classPrefix = 'iconfont'; // the CSS class prefix of the scss partial? E.g. `[prefix]-chevron`
var partialFileName = '_iconfont.scss'; // the name of the generated scss filename

gulp.task('iconfont', function(callback) {
  runSequence(
    ['cleanTempIcons'],
    ['copyTempIcons'],
    ['generateIcons'],
    ['cleanTempIcons'],
    callback);
});

gulp.task('generateIcons', function(){

  return gulp.src(['src/fonts/icons/temp/**/*.svg']) // the location of all the svg files to be created into the font
    .pipe($.iconfont({
      normalize: true,
      fontName: fontName,
      appendCodepoints: true
    }))
    .on('codepoints', function(codepoints, options) {
      codepoints.forEach(function(glyph, idx, arr) {
        arr[idx].codepoint = glyph.codepoint.toString(16); // automatically assign a unicode value to the icon
      });
      gulp.src('src/styles/fonts/_template.scss') // a template scss file, used to generate the scss code for all the icons
        .pipe($.consolidate('lodash', {
          glyphs: codepoints,
          fontName: options.fontName,
          fontPath: fontPath, // path to font directory, relative to the production CSS file
          className: classPrefix // what should the icon class be prefixed with? E.g.`[prefix]-chevron`
        }))
        .pipe($.rename(partialFileName)) // rename the generated scss filename, otherwise it inherits the filename of the template scss file
        .pipe(gulp.dest('src/styles/fonts/')); // directory to save the generated scss file (absolute path)
    })
    .pipe(gulp.dest('dist/fonts')); // where to save the generated font files (absolute path)
});

gulp.task('cleanTempIcons', function(){
  return gulp.src(['src/fonts/icons/temp'])
    .pipe($.rimraf());
});

gulp.task('copyTempIcons', function(){
  return gulp.src(['src/fonts/icons/**/*.svg'])
    .pipe(gulp.dest('src/fonts/icons/temp'));
});
