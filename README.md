# Gulp Boilerplate

## Key Features

* Compiles scss with gulp-compass and gulp-autoprefixer
* Compiles local scripts and bower dependencies using browserify
* Icon font generator gulp task, which converts svg images to font files and creates a dynamic `_iconfont.scss` partial which references the icon font and unicode characters
* Browser Sync gulp task, which can serve static files or from localhost/yourlocal.dev

## Getting Started

Run the following in your terminal
```
$ npm install
$ bower install
$ gem install sass
$ gem install compass
```

## Watch Assets

To watch for changes to styles, scripts and images:
```
$ gulp watch
```

To ONLY watch styles:
```
$ gulp watch:styles
```

To ONLY watch scripts:
```
$ gulp watch:scripts
```

## Serve

To serve static files from base directory or as a proxy server (as `127.0.0.1:8000` or something like `yourlocal.dev`):
```
$ gulp serve // Uses BrowserSync - further config may be required
```