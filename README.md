#Boilerplate for Gulp

##Installation

###Required
```
$ npm install
$ bower install
```

###Optional if using ruby sass and compass

```
$ gem install sass
$ gem install compass
$ gem install breakpoint
```

##Available Gulp Tasks

###$ gulp styles

Compiles Sass using Compass and Autoprefixer.

bower_components has been added to the compass import_path, which allows you to @import bower components in your main.scss file without the full bower path:

```
// Use this
@import "normalize-scss/normalize";
// instead of
@import "bower_components/normalize-scss/normalize";
```
 

###$ gulp styles-libsass

Exactly the same as `gulp styles`, but uses libsass instead of compass.

####Pros
* Doesn't need ruby or ruby sass gem, so no cache files are created (easier if you're on Windows)
* Libsass is apparently >10x faster at compiling sass than the ruby version of sass

####Cons
* At the moment, libsass doesn't have all the features of ruby sass fully implemented, so you might get buggy compilation


###$ gulp scripts

Concatenates scripts using browserify.


###$ gulp generatefonts

Converts .svg files into font files (`.svg`, `.ttf`, `.eot`, `.woff`) with automatically assigned unicode character values for each `.svg` icon found.

Also generates an `.scss` file with pre-made icon classes referencing each character of the generated font.


###$ gulp watch

Watches for changes to files in the following directories:

* static/styles/**/*.scss
* static/scripts/**/*.js
* static/svg/**/*.svg
* static/images/**/*.*