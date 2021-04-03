"use strict";

const path                    = require('path'),
      gulp                    = require('gulp'),
      sass                    = require('gulp-sass'),
      autoprefixer            = require('autoprefixer'),
      sourcemaps              = require('gulp-sourcemaps'),
      browserSync             = require('browser-sync'),
      gcmq                    = require('gulp-group-css-media-queries'),
      csso                    = require('gulp-csso'),
      postcss                 = require('gulp-postcss'),
      ttf2woff                = require('gulp-ttf2woff'),
      ttf2woff2               = require('gulp-ttf2woff2'),
      tinypng                 = require('gulp-tinypng-unlimited');

const babel = require("gulp-babel");

const isDev = process.env.NODE_ENV === 'development';

gulp.task('move-dist', function (done) {
  return gulp.src('./public/**')
    .pipe(gulp.dest('./dist'));
})

gulp.task('sass', function () {
  return gulp.src('./src/scss/style.scss')
  .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./src/css'));
});

gulp.task('postcss', function () {
  const plugins = [
    autoprefixer(),
  ];
  return gulp.src('./src/css/*.css')
    .pipe(postcss(plugins))
    .pipe(gcmq())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('tiny', function() {
  return gulp.src([
    './src/images/**/*.@(png|jpg|jpeg)',
    '!./src/images/Sprite/**/*.@(png|jpg|jpeg)',
  ])
  .pipe(plumber()) 
  .pipe(tinypng())
  .pipe(gulp.dest('./dist/images'));
});

gulp.task('tiny', function() {
  return gulp.src([
    './src/images/**/*.@(png|jpg|jpeg)',
  ])
  .pipe(plumber()) 
  .pipe(tinypng())
  .pipe(gulp.dest('./dist/images'));
});

gulp.task("babel", function () {
  return gulp.src("src/js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/js"));
});

gulp.task('browser-sync' , function() { 
  browserSync({
      server: {
          baseDir: 'src'
      },
      //browser: 'Firefox',
      notify: false
  });
});

gulp.task('ttf2woff2', function () {
  gulp.src(['fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('fonts/'));
});

gulp.task('ttf2woff', function () {
  gulp.src(['fonts/*.ttf'])
    .pipe(ttf2woff())
    .pipe(gulp.dest('fonts/'));
});

gulp.task("clean", clean);
function clean() {
  return del(["./dist"]);
}

gulp.task('watch', function() {
  // Наблюдение
  gulp.watch('src/scss/style.scss', gulp.parallel('sass'));  
  gulp.watch('src/js/**/*.js', gulp.parallel('babel'));
  // Обновление страницы
  gulp.watch('src/css/style.css').on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', browserSync.reload); 
  gulp.watch('src/js/*.js').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch', 'move-dist', 'sass', 'browser-sync'));


