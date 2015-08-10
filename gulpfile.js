var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var zip = require('gulp-zip');
var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var manifest = require('gulp-chrome-manifest');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');

// clean build directory
gulp.task('clean', function(cb) {
  del('build/*', cb);
});

// copy static assets to build directory
gulp.task('copy', function() {
  gulp.src('app/icons/**')
    .pipe(gulp.dest('build/icons'));
  gulp.src('app/_locales/**')
    .pipe(gulp.dest('build/_locales'));
  gulp.src('app/options.html')
    .pipe(gulp.dest('build'));
});

gulp.task('manifest', function() {
  gulp.src('app/manifest.json')
    .pipe(gulp.dest('build/'))
    .pipe(livereload());
});

gulp.task('manifest-production', function() {
  gulp.src('app/manifest.json')
    .pipe(manifest({
      background: {
        target: 'scripts/background.js'
      }
    }))
    .pipe(gulp.dest('build/'))
});

gulp.task('archive', ['scripts', 'copy', 'manifest-production'], function() {
  var manifest = require('./app/manifest.json'),
    distFileName = 'github-flexible-header' + ' v' + manifest.version + '.zip'

  gulp.src(['build/**', '!build/scripts/**/*.map'])
    .pipe(zip(distFileName))
    .pipe(gulp.dest('pkg'));
});

gulp.task('scripts', function() {
  buildScript('contentscript.js', false);
  buildScript('options.js', false);
  buildScript('background.js', false);
});

gulp.task('watch', ['scripts', 'copy', 'manifest'], function() {
  livereload.listen();
  buildScript('contentscript.js', true);
  buildScript('options.js', true);
  buildScript('background.js', true);
  gulp.watch([
    'app/options.html',
    'app/icons/*.png',
    'app/_locales/**/*.json'
  ], ['copy']);
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end');
}

function buildScript(file, watch) {
  var props = {
    entries: ['app/scripts/' + file],
    debug: true,
    cache: {},
    packageCache: {}
  };
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  bundler.transform(babelify);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('build/scripts'))
      .pipe(gulpif(watch, livereload()));
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
}
