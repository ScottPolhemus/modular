var gulp = require('gulp');
var livereload = require('gulp-livereload');

require('./tasks/sass');
require('./tasks/browserify');

// Run 'gulp build' to compile once
gulp.task('build', ['sass', 'browserify']);

// Run 'gulp' for live-reloading
gulp.task('default', ['sass', 'watchify'], function() {
  livereload.listen();

  gulp.watch(['./**/*.scss'], ['sass']);

  gulp.watch(['./styles/*.css'], function(event) {
    livereload.changed(event.path);
  });
});