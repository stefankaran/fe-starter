var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    spritesmith = require('gulp.spritesmith'),
    sourcemaps = require('gulp-sourcemaps'),
    reload = browserSync.reload;

gulp.task('sass', function() {
    return gulp.src('app/scss/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(cleanCSS())
        // .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/assets/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('html', function() {
   gulp.src('app/*.html')
        .pipe(reload({stream:true}));
});

gulp.task('watch', ['browserSync'], function() {
   gulp.watch('app/scss/**/*.scss', ['sass']);
   gulp.watch('app/*.html', ['html']);
});

gulp.task('script', function() {
    return gulp.src([
      'app/js/jquery.min.js',
      'main.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('app/assets/js/'))
    .pipe(reload({stream:true}));
});

gulp.task('browserSync', function() {
   browserSync.init ({
       server: {
           baseDir: 'app'
       },
   })
});

gulp.task('default', ['sass', 'watch', 'html', 'script'])
