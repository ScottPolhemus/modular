var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var shim = require('browserify-shim');
var fs = require('fs');
var path = require('path');
var glob = require('glob');

var bundleOpts = {
  entries: './scripts/src/main.js',
  transform: [shim],
  debug: true
};

gulp.task('browserify', function(callback) {
  return browserifyTask(false, callback);
});

gulp.task('watchify', function() {
  return browserifyTask(true);
});

function browserifyTask(watch, cb) {
  var b = browserify(bundleOpts);

  // Require module scripts
  b.require(themeModules());

  // Minify plugin w/ source map options
  b.plugin('minifyify', {
    map: 'main.min.js.map',
    output: './scripts/main.min.js.map',
    compressPath: function(p) {
      // Add relative path to project root
      return path.join('../', p);
    }
  });

  function bundle() {
    bundleLogger.start('main.min.js');

    var bundle = b.bundle()
      .on('error', function (err) { console.error(err.message); })
      .on('end', function() {
        bundleLogger.end('main.min.js');

        if(typeof cb !== 'undefined') {
          cb();
        }
      })
      .pipe(fs.createWriteStream('./scripts/main.min.js'));
  }

  if(watch) {
    b = watchify(b);
    b.on('update', bundle);
  }

  return bundle();
}

// Returns an array of module scripts to require
function themeModules() {
  var moduleFiles = glob.sync('modules/**/*.js');
  var modules = [];

  for(var i = 0; i < moduleFiles.length; i++) {
    var name = path.basename(moduleFiles[i], '.js');

    modules.push({
      file: './'+moduleFiles[i],
      expose: 'modules/'+name
    });
  }

  return modules;
}

// bundleLogger

var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime;

var bundleLogger = {
  start: function(filepath) {
    startTime = process.hrtime();
    gutil.log('Bundling', gutil.colors.green(filepath));
  },

  end: function(filepath) {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('Bundled', gutil.colors.green(filepath), 'in', gutil.colors.magenta(prettyTime));
  }
};