const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('default', () =>
  gulp
    .src('source/images-src/**/*.{gif,png,jpg,}')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ]),
    )
    .pipe(gulp.dest('source/images')),
);
