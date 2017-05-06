const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');

gulp.task('styles', function () {
	gulp.src('./sass/main.sass')
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(cssbeautify({
		indent: '    ',
		autosemicolon: true
	}))
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch('./sass/*.sass', ['styles']);
	gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'serve']);