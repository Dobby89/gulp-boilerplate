var src = './src';
var dist = './dist';

module.exports = {
  paths: {
    src: src,
    dist: dist
  },

  styles: {
    src: src + '/styles/**/*.scss',
    dist: dist + '/styles',
    settings: {
      includePaths: ['./bower_components'],  // so the compiler knows to look for scss files within the bower directory as well
      outputStyle: 'compressed', // nested, expanded, compact, compressed
      sourceComments: 'none' // 'none', 'normal' or 'map'
    },
    pleaseOptions: {
      production : {
        autoprefixer: ["last 4 versions", "ios 6"],
        filters: false,
        rem: ["16px", {replace: false, atrules: false}],
        pseudoElements: true,
        opacity: true,
        import: true,
        minifier: {preserveHacks: true, removeAllComments: true},
        mqpacker: true,
        sourcemaps: false,
        next: false
      },
      development: {
        autoprefixer: ["last 2 versions"],
        minifier: false,
        sourcemaps: true
      }
    }
  },

  iconFont: {
    src: src + '/fonts/icons/temp/**/*.svg',
    dist: dist + '/fonts',
    copySrc: src+ '/fonts/icons/**/*.svg', // where the source icons are
    copyDist: src + '/fonts/icons/temp', // where the icons get temporarily copied to while the font is generated
    options: {
      normalize: true,
      fontName: 'iconfont',
      appendCodepoints: true,
      fontHeight: 1001 // fixes badly rendered icons
    },
    template: {
      src: src + '/styles/fonts/_template.scss',
      dist: src + '/styles/fonts/',
      sassPartialName: '_iconfont.scss',
      options: {
        fontPath: '../fonts/', // path to font directory, relative to the production CSS file
        className: 'iconfont' // what should the icon class be prefixed with? E.g.`[prefix]-chevron`
      }
    }
  },

  sprite: {
    src: src + '/svg/icons/*.svg',
    svgDist: dist+ '/images/sprite.svg',
    pngDist: dist+ '/images/sprite.png',
    options: {
      cssPathSvg: '../images/sprite.svg',
      templateSrc: src + '/styles/sprite/_template.scss',
      templateDest: src + '/styles/sprite/_sprite.scss',
      // IE8 PNG fallback
      cssPathNoSvg: '../images/sprite.png',
      padding: 4, // spacing between icons
      pixelBase: 16,
      positioning: 'packed', // vertical | horizontal | diagonal | packed
      units: 'px'
    }
  }
};
