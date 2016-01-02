var gulp = require('gulp');
var copy = require('gulp-copy');
var sass = require('gulp-ruby-sass');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('sass', function () {
    return sass('app/scss/styles.scss')
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({
            stream: true
        }));
});

var tsProject = ts.createProject({
    outFile: 'app.js',
    sourceMap: true
});
gulp.task('scripts', function () {
	var tsResult = gulp.src('app/ts/**/*.ts') // instead of gulp.src(...)
		.pipe(ts(tsProject));

	return tsResult.js.pipe(gulp.dest('app/scripts'));
});

gulp.task('copy', function () {
    gulp.src('bower_components/bootstrap-sass/assets/fonts/**/*')
        .pipe(copy('app/fonts', {
            prefix: 4
        }));
});

gulp.task('serve', ['copy', 'sass', 'scripts'], function () {
    browserSync({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/ts/**/*.ts', ['scripts', reload]);

    gulp.watch(
        ['*.html', 'views/**/*.html', 'scripts/**/*.js'], {},
        reload
    );
});
