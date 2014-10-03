'use strict';

var gulp = require('gulp');
var path = require('path');
var pngcrush = require('imagemin-pngcrush');

var $ = require('gulp-load-plugins')();

/**
 * Build tasks
 *
 * Runs all of the tasks in this file from one command
 *
 * Usage: gulp build
 */
gulp.task('build', ['styles', 'scripts', 'copyfonts', 'copysvg', 'copyimages']);

/**
 * Clean output directories
 *
 * Gets rid of all the folders and files created by `gulp build` and `gulp watch`
 *
 * Usage: gulp clean
 */
gulp.task('clean', function () {
  return gulp.src(['static/dist', 'static/.sass-cache']).pipe($.rimraf());
});

/**
 * Copy fonts needed for the website
 *
 * Usage: gulp copyfonts
 */
gulp.task('copyfonts', function () {
  return gulp.src([
      'static/fonts/**/*.*'
    ])
    .pipe(gulp.dest('static/dist/fonts'));
});

/**
 * Copy svgs into /dist
 *
 * Usage: gulp copysvg
 */
gulp.task('copysvg', function () {
  return gulp.src('static/svg/**/*.*')
    .pipe(gulp.dest('static/dist/svg'));
});

/**
 * Copy images into /dist
 *
 * Usage: gulp sopyimages
 */
gulp.task('copyimages', function () {
  return gulp.src('static/images/**/*.*')
    .pipe(gulp.dest('static/dist/images'));
});

/**
 * Compile website SASS
 *
 * Usage: gulp styles
 */
gulp.task('styles', function () {
  return gulp.src('static/styles/**/*.scss')
    .pipe($.compass({
      project: path.join(__dirname, '../', 'static'),
      css: 'dist/styles',
      sass: 'styles',
      require: ['compass-normalize'],
      import_path: '../bower_components', // so compass knows to look for files within the bower directory if we reference files
      style: 'compressed',
      sourcemap: false
    }))
    // catch any compilation errors and output to the console and a popup to stop the process needing to be restarted every time there's an error
    .on('error', $.notify.onError())
    .on('error', function (err) {
      console.log('Error:', err);
    })
    .pipe($.size({title: 'main.css'}));
});

/**
 * Concatenate website main scripts using browserify
 *
 * Usage: gulp scripts
 */
gulp.task('scripts', function () {
  return gulp.src(['static/scripts/main.js'], { read: false })
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
    .on('error', $.notify.onError())
    .on('error', function (err) {
      console.log('Error:', err);
    })
    .pipe(gulp.dest('static/dist/scripts'))
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
 * Usage: $ gulp generatefonts
 */
var fontName = 'iconfont'; // the filename of the generated font files
var fontPath = '../fonts/'; // path to font directory, relative to the production CSS file
var classPrefix = 'iconfont'; // the CSS class prefix of the scss partial? E.g. `[prefix]-chevron`
var partialFileName = '_iconfont.scss'; // the name of the generated scss filename

gulp.task('generatefonts', function(){
  gulp.src(['static/svg/icons/**/*.svg']) // the location of all the svg files to be created into the font
    .pipe($.iconfont({
      normalize: true,
      fontName: fontName,
      appendCodepoints: true
    }))
    .on('codepoints', function(codepoints, options) {
      codepoints.forEach(function(glyph, idx, arr) {
        arr[idx].codepoint = glyph.codepoint.toString(16); // automatically assign a unicode value to the icon
      });
      gulp.src('static/styles/branding/_iconfont-template.scss') // a template scss file, used to generate the scss code for all the icons
        .pipe($.consolidate('lodash', {
          glyphs: codepoints,
          fontName: options.fontName,
          fontPath: fontPath, // path to font directory, relative to the production CSS file
          className: classPrefix // what should the icon class be prefixed with? E.g.`[prefix]-chevron`
        }))
        .pipe($.rename(partialFileName)) // rename the generated scss filename, otherwise it inherits the filename of the template scss file
        .pipe(gulp.dest('static/styles/branding/')); // directory to save the generated scss file (absolute path)
    })
    .pipe(gulp.dest('static/fonts')); // where to save the generated font files (absolute path)
});
