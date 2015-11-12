var gulp = require('gulp');
var livereload = require('gulp-livereload');

require('./tasks/sass');
require('./tasks/browserify');

/**
 * Defines the "build" task for Gulp.
 */
gulp.task('build', ['sass', 'browserify']);

/**
 * Defines the default (development) task for Gulp.
 */
gulp.task('default', ['sass', 'watchify'], function() {
  livereload.listen();

  // Watch stylesheets
  gulp.watch(['./**/*.scss'], ['sass']);

  // Watchify handles the scripts

  // When compile tasks finish, trigger livereload
  gulp.watch(['./styles/*.css', './scripts/*.js'], function(event) {
    livereload.changed(event.path);
  });
});