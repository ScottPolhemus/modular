var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var glob = require('glob');

var sassConfig = {
  outputStyle: 'compressed',
  importer: function(url, prev, done) {
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
};

gulp.task('sass', function() {
  return gulp.src('./styles/src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(sassConfig).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./styles'));
});