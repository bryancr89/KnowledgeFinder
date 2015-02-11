var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var cover = require('gulp-coverage');
gulp.task('mocha', function() {
	return gulp.src(['test/*.js'], { read: false })
		.pipe(cover.instrument({
			pattern: ['app/*.js']
		}))
		.pipe(mocha({ reporter: 'list' }))
		.pipe(cover.gather())
		.pipe(cover.format())
		.pipe(gulp.dest('code-coverage'))
		.on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
	gulp.watch(['lib/**', 'test/**'], ['mocha']);
});