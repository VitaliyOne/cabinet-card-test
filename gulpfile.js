import gulp from 'gulp';
import browserSync from 'browser-sync';

const paths = ['./src/*.html', './src/css/*.css', './src/js/*.js'];

gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: './src/',
		},
	});

	paths.forEach(path => {
		gulp.watch(path).on('change', browserSync.reload);
	});
});

gulp.task('default', gulp.series('browserSync'));
