const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const rename = require('gulp-rename');
const notify = require('gulp-notify');

gulp.task('js', () => {
  gulp.src(['./controllers/**/*.js'])
  .pipe(concat('all.js'))
  .pipe(gulp.dest('./public/scripts'));
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
