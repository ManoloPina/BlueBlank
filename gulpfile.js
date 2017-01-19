const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');

gulp.task('default', ['watch'], () => {
  console.log('Default on going!');
});

gulp.task('webpack', () => {
   gulp.src(['./controllers/**/*.js'])
  .pipe(webpackStream(require('./webpack.config')))
  .on('error', function handleError() {
      this.emit('end'); // Recover from errors
  })
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('./public/scripts'))
  .pipe(notify({
    title: 'Compiled...',
    onLast: true
  }));
});

gulp.task('less', () => {
  gulp.src(['./styles/**/*.less'])
  .pipe(less())
  .pipe(concat('bundle.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('dependencies', () => {
  gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/underscore/underscore-min.js',
    './node_modules/react/dist/react.js',
    './node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
    './node_modules/react-dom/dist/react-dom.js'
  ])
  .pipe(concat('dependencies.js'))
  .pipe(gulp.dest('./public/scripts'));

  gulp.src([
    './node_modules/bootstrap/dist/css/bootstrap.min.css'
  ])
  .pipe(concat('dependencies.css'))
  .pipe(cleanCSS())
  .pipe(gulp.dest('./public/stylesheets'))
  .pipe(notify('Dependencies created...'));
});

gulp.task('watch', () => {
  gulp.watch([
    './controllers/**/*.js',
    './styles/**/*'
  ], ['less','webpack']);
});
