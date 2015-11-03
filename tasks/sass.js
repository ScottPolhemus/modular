var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var glob = require('glob');

var sassConfig = {
  outputStyle: 'compressed',
  importer: importModules
};

gulp.task('sass', function() {
  return gulp.src('./styles/src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./styles'));
});

// Expose module partials to SASS as "modules/[name]".
function importModules(url, prev) {
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