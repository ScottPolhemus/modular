var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var glob = require('glob');

/** Defines the "sass" task for Gulp. */
gulp.task('sass', function() {
  var sassOpts = {
    outputStyle: 'compressed',
    importer: moduleStylesImporter
  };

  return gulp.src('./styles/src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassOpts).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./', {
      sourceRoot: './src/',
      includeContent: false
    }))
    .pipe(gulp.dest('./styles'));
});

/** 
* Custom importer for node-sass.
* Makes module partials available to import as "modules/[name]".
*/
function moduleStylesImporter(url, prev) {
  if(url.indexOf('modules/') === 0) {
    var files = glob.sync('./'+url+'/*.scss');

    if(files.length > 0) {
      return {
        file: files[0]
      };
    }
  }

  return prev;
}