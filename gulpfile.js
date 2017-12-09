var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass',function() {
	return gulp.src('sass/*.*').pipe(sass()).pipe(gulp.dest('css'));
})
gulp.task('default',['sass','watch']);
gulp.task('watch',function(){
	return gulp.watch('sass/*.*',['sass']);
})