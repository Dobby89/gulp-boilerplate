var src = './src';
var dist = './dist';

module.exports = {
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
  }
};
