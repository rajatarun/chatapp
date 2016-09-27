'use strict';
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jsFiles = ['*.js','src/js/**/*.js'];

gulp.task('style',function() {
	return gulp.src(jsFiles).pipe(jshint()).pipe(jshint.reporter('jshint-stylish',{
		verbose:true
	})).pipe(jscs());
});
gulp.task('inject',function(){
	var wiredep = require('wiredep').stream;
	var inject = require('gulp-inject');
	var options = {
		bowerJson: require('./bower.json'),
		directory: './src/lib'
	};
	var injectPath = gulp.src(['./src/js/*.js','./src/js/controller/*.js','./src/js/directives/*.js','./src/js/services/*.js','./src/css/*.css'],{read:false});
	var injectOptions = {
		ignorePath:'/src'
	};
	return gulp.src('./src/*.html').pipe(wiredep(options)).pipe(inject(injectPath,injectOptions))
	.pipe(gulp.dest('./src'));
});
gulp.task('build',function(){
	var files = ['./src/**/*.*','./routes/**/*.*','./tasks/**/*.*','./*.*','./.*'];
	gulp.src(files,{base:'./'}).pipe(gulp.dest('./build'));
});
gulp.task('watch',function(){
	var files = ['./src/**/*.*','./routes/**/*.*','./tasks/**/*.*','./*.*','./.*'];
	gulp.watch(files,['build']);
});
gulp.watch(['./src/**/*.*','./routes/**/*.*','./tasks/**/*.*','./*.*','./.*'], ['watch','build']);
