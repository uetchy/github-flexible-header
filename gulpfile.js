var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var zip = require('gulp-zip');
var del = require('del');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var jeditor = require('gulp-json-editor');
var livereload = require('gulp-livereload');
var through2 = require('through2');

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end');
}

gulp.task('scripts', function() {
  var browserified = through2.obj(function(file, enc, next) {
    browserify(file.path, {
        debug: true
      })
      .transform('babelify')
      .bundle(function(err, res) {
        file.contents = res;
        next(null, file);
      });
  });

  return gulp.src(['./app/scripts/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(require('jshint-stylish')))
    .pipe(browserified)
    .on('error', handleErrors)
    .pipe(gulp.dest('./build/scripts'))
    .pipe(livereload());
});

gulp.task('manifest', function() {
  gulp.src('app/manifest.json')
    .pipe(gulp.dest('build/'))
    .pipe(livereload());
});

gulp.task('manifest-production', function() {
  var npmPackage = require('./package.json');
  gulp.src('app/manifest.json')
    .pipe(jeditor({
      version: npmPackage.version,
      background: {
        scripts: ['scripts/background.js']
      }
    }))
    .pipe(gulp.dest('build/'));
});

// copy static assets to build directory
gulp.task('copy', function() {
  gulp.src('app/icons/*')
    .pipe(gulp.dest('build/icons'));
  gulp.src('app/_locales/**')
    .pipe(gulp.dest('build/_locales'));
  gulp.src('app/options.html')
    .pipe(gulp.dest('build'));
});

gulp.task('archive', ['scripts', 'copy', 'manifest-production'], function() {
  var manifest = require('./app/manifest.json'),
    distFileName = 'github-flexible-header' + '_v' + manifest.version + '.zip'

  gulp.src(['build/**', '!build/scripts/**/*.map'])
    .pipe(zip(distFileName))
    .pipe(gulp.dest('pkg'));
});

gulp.task('watch', ['scripts', 'copy', 'manifest'], function() {
  livereload.listen();
  gulp.watch([
    'app/scripts/*.js'
  ], ['scripts']);
  gulp.watch([
    'app/options.html',
    'app/icons/*.png',
    'app/_locales/**/*.json'
  ], ['copy']);
});

// clean build directory
gulp.task('clean', function(cb) {
  del('build/*', cb);
});
