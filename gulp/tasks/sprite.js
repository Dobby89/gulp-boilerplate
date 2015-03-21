'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var svgspritesheet = require('gulp-svg-spritesheet');
var handleErrors = require('../helpers/handleErrors');

/**
 * Sprite generator
 *
 * Converts .svg files into an .svg sprite sheet (with a .png fallback for IE8)
 *
 * Also generates an .scss file with pre-made icon classes referencing each icon from the sheet
 *
 * Usage: $ gulp sprite
 */
gulp.task('sprite', function () {
  return gulp.src('src/svg/icons/*.svg')
    .pipe(svgspritesheet({
      cssPathSvg: '../images/sprite.svg',
      templateSrc: 'src/styles/sprite/_template.scss',
      templateDest: 'src/styles/sprite/_sprite.scss',

      // IE8 PNG fallback
      cssPathNoSvg: '../images/sprite.png',
      padding: 4, // spacing between icons
      pixelBase: 16,
      positioning: 'vertical', // vertical | horizontal | diagonal | packed
      units: 'px'
    }))
    .pipe(gulp.dest('dist/images/sprite.svg'))
    .pipe($.svg2png())
    .pipe(gulp.dest('dist/images/sprite.png'));
});
