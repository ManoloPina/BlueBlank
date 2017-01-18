const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('js', () => {
  gulp.src(['./controllers/**/*.js'])
  .pipe(concat('all.js'))
  .pipe(gulp.dest('./public/scripts'));
});
