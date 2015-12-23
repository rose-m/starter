var gulp = require('gulp');
var copy = require('gulp-copy');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function () {
    return sass('app/scss/styles.scss')
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('copy', function () {
    gulp.src('bower_components/bootstrap-sass/assets/fonts/**/*')
        .pipe(copy('app/fonts', {
            prefix: 4
        }));
});

gulp.task('serve', ['copy', 'sass'], function () {
    browserSync({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('app/scss/**/*.scss', ['sass']);

    gulp.watch(
        ['*.html', 'views/**/*.html', 'scripts/**/*.js'], {},
        reload
    );
});
