#Boilerplate for Gulp

Compiles styles (Sass), scripts (JavaScript) and bower dependencies using gulp.

Also includes an icon font generator gulp task, which converts svg images to font files and creates a dynamic `scss` partial which references the icon font and unicode characters.

###Getting Started
```
$ npm install
$ bower install
$ gem install sass
```

###Compass
If you're planning to use compass, install the ruby gem `$ gem install compass` and uncomment `@import "compass";` in static/styles/main.scss