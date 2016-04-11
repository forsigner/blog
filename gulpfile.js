const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant'); // $ npm i -D imagemin-pngquant

gulp.task('default', () => {
  return gulp.src('./source/images-src/**/*')
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./source/images'));
});
