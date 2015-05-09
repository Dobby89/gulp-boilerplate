# Gulp Boilerplate

## Key Features

* Compile SCSS to CSS with [gulp sass](https://github.com/dlmanning/gulp-sass)
* Post-process CSS using [gulp pleeease] (https://github.com/danielhusar/gulp-pleeease) (includes autoprefixer)
* Compile local scripts and bower dependencies using [gulp browserify](https://github.com/deepak1556/gulp-browserify)
* Generate custom font icons from SVG files and create a dynamic `_iconfont.scss` partial which references the icon font and unicode characters, using [gulp iconfont](https://github.com/nfroidure/gulp-iconfont)
* Generate SVG spritesheet, merging separate SVG images into a single `sprite.svg` (and `sprite.png` fallback for IE8). Also generates a dynamic `_sprite.scss` partial which references each icon, using [gulp svg spritesheet](https://github.com/iamdarrenhall/gulp-svg-spritesheet) and [gulp svg2png](gulp-svg2png)

## Usage

    $ npm install
    $ bower install
    $ gulp

## Available Gulp Tasks

### Build Tasks
    $ gulp // cleans then builds
    $ gulp build
    $ gulp clean

### Styles
Compile SCSS to CSS and post-process for vendor prefixes and browser fixes.

    $ gulp styles

### Scripts
Compile JS using Browserify.

    $ gulp scripts


### Watch
Watch styles and scripts (style-only and script-only watch tasks available).

    $ gulp watch
    $ gulp watch:styles
    $ gulp watch:scripts

### Icon Font
Create a custom icon font from separate SVG files inside `src/fonts/icons/`. This will also create `_iconfont.scss` which references each icon.

    $ gulp iconfont

### Sprite Sheet
Create an SVG spritesheet from multiple SVG files inside `src/svg/icons/`. This will also create `_sprite.scss` which references each icon.

    $ gulp sprite
