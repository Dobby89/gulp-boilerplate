'use strict';

var gulp = require('gulp');
var path = require('path');
var pngcrush = require('imagemin-pngcrush');
var $ = require('gulp-load-plugins')();
var svgspritesheet = require('gulp-svg-spritesheet');
var handleErrors = require('./handleErrors');

/**
 * Build tasks
 *
 * Runs all the build tasks in this file from one command.
 *
 * Usage: gulp build
 */
gulp.task('build', ['sprite', 'iconfont', 'styles', 'scripts', 'copyfonts', 'copysvg', 'copyimages']);

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

/**
 * Copy fonts needed for the website
 *
 * Usage: gulp copyfonts
 */
gulp.task('copyfonts', function () {
  return gulp.src([
      'src/fonts/**/*.*'
    ])
    .pipe(gulp.dest('dist/fonts'));
});

/**
 * Copy svgs into /dist
 *
 * Usage: gulp copysvg
 */
gulp.task('copysvg', function () {
  return gulp.src('src/svg/**/*.svg')
    .pipe(gulp.dest('dist/svg'));
});

/**
 * Copy images into /dist
 *
 * Usage: gulp copyimages
 */
gulp.task('copyimages', function () {
  return gulp.src('src/images/**/*.{jpg,png,gif}')
    .pipe(gulp.dest('dist/images'));
});

/**
 * Compile website Sass using compass
 *
 * Also uses autoprefixer, so no need for compass mixins
 *
 * Usage: gulp styles
 */
gulp.task('styles-compass', function () {
  return gulp.src('src/styles/**/*.scss')
    .pipe($.compass({
      project: path.join(__dirname, '../', 'src'),
      css: '../dist/styles', // The target directory where you keep your css stylesheets. It is relative to the project option.
      sass: 'styles', // The source directory where you keep your sass stylesheets. It is relative to the project option.
//      require: ['compass-normalize'], // include any ruby gems here, so compass knows to require them
      import_path: '../bower_components', // The directory where you keep external Compass plugins or extensions that you would like to make available using the @import function. Common use case would be setting this to your bower_components directory for example. It is relative to the project option.
      logging  : false,
      comments : false,
      style: 'expanded', // e.g. nested, expanded, compact, or compressed
      sourcemap: false
    }))
    // catch any compilation errors and output to the console and a popup to stop the process needing to be restarted every time there's an error
    .on('error', handleErrors)
    .pipe($.autoprefixer('last 2 version'))
    // catch any compilation errors and output to the console and a popup to stop the process needing to be restarted every time there's an error
    .on('error', handleErrors)
    .pipe($.size({title: 'main.css'}))
    .pipe(gulp.dest('dist/styles'));
});

/**
 * Compile website Sass using gulp-sass
 *
 * Uses libsass, which is apparently ~10x faster than ruby!
 *
 * This means you don't need to install Ruby gems because this is a node/gulp implementation of the sass compiler.
 *
 * Usage: gulp styles-libsass
 */
gulp.task('styles', ['sprite', 'iconfont'], function () {
  return gulp.src('src/styles/**/*.scss')
    .pipe($.sass({
      // See https://github.com/sass/node-sass for full list of parameter references
      includePaths: ['./bower_components'],  // so the compiler knows to look for scss files within the bower directory as well
      outputStyle: 'compressed', // 'nested' or 'compressed' ('expanded' and 'compact' are not currently supported by libsass)
      sourceComments: 'none' // 'none', 'normal' or 'map'
    }))
    .on('error', handleErrors)
    .pipe($.autoprefixer('last 2 version'))
    .on('error', handleErrors)
    .pipe($.size({title: 'main.css'}))
    .pipe(gulp.dest('dist/styles'));
});

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

gulp.task('iconfont', function(){
  return gulp.src(['src/svg/font_icons/**/*.svg']) // the location of all the svg files to be created into the font
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
    .pipe(gulp.dest('src/fonts')); // where to save the generated font files (absolute path)
});


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
