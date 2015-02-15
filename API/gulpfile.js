var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var cover = require('gulp-coverage');
var to5 = require("gulp-6to5");

gulp.task('6to5', function() {
	return gulp.src("app/**/*.js")
		.pipe(to5())
		.pipe(gulp.dest('.tmp'));
});

gulp.task('test', ['6to5'], function() {
	return gulp.src(['test/**/*.spec.js'], { read: false })
		.pipe(cover.instrument({
			pattern: ['.tmp/*.js']
		}))
		.pipe(mocha({ reporter: 'list' }))
		.pipe(cover.gather())
		.pipe(cover.format())
		.pipe(gulp.dest('code-coverage'))
		.on('error', gutil.log);
});

gulp.task('watch-test', function() {
	gulp.watch(['lib/**', 'test/**'], ['test']);
});