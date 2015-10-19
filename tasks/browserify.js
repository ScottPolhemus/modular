// Based on: https://github.com/greypants/gulp-starter/blob/master/gulp/tasks/browserify.js

// Gulp stuff
var gulp = require('gulp');
var livereload = require('gulp-livereload');

// Browserify stuff
var browserify = require('browserify');
var shim = require('browserify-shim');
var watchify = require('watchify');

// Vinyl stream stuff
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var mergeStream = require('merge-stream');

// Utils
var _ = require('lodash');
var path = require('path');
var glob = require('glob');
var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');

// Include all module scripts in main bundle and expose them as "modules/[module-name]"

var moduleScriptFiles = glob.sync('modules/**/*.js');
var moduleScripts = [];

for(var i = 0; i < moduleScriptFiles.length; i++) {
  var name = path.basename(moduleScriptFiles[i], '.js');

  moduleScripts.push({
    file: './'+moduleScriptFiles[i],
    expose: 'modules/'+name
  });
}

var config = {
  bundles: [
    {
      entries: './scripts/src/main.js',
      dest: './scripts',
      outputName: 'main.js',
      paths: ['./scripts/src'],
      transform: [shim],
      debug: true,
      require: moduleScripts
    }
  ]
};

var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);

  args.forEach(function(err, i) {
    gutil.log(err.toString());
  });

  // Keep gulp from hanging on this task
  this.emit('end');
};

var startTime;

var bundleLogger = {
  start: function(filepath) {
    startTime = process.hrtime();
    gutil.log('Bundling', gutil.colors.green(filepath) + '...');
  },

  watch: function(bundleName) {
    gutil.log('Watching files required by', gutil.colors.yellow(bundleName));
  },

  end: function(filepath) {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('Bundled', gutil.colors.green(filepath), 'in', gutil.colors.magenta(prettyTime));
  }
};

var browserifyTask = function(devMode) {

  var browserifyThis = function(bundleConfig) {

    if(devMode) {
      // Add watchify args
      _.extend(bundleConfig, watchify.args);
    }

    var bundleConfigRequire = bundleConfig.require;
    bundleConfig.require = null;
    
    var b = browserify(bundleConfig);

    if(bundleConfigRequire) {
      b.require(bundleConfigRequire);
    }

    b.plugin('minifyify', {
      map: bundleConfig.outputName+'.map',
      output: 'scripts/'+bundleConfig.outputName+'.map'
    });

    var bundle = function() {
      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName);

      return b.bundle()
        .on('error', handleErrors)
        .pipe(source(bundleConfig.outputName))
        .pipe(buffer())
        .pipe(gulp.dest(bundleConfig.dest))
        .pipe(livereload());
    };

    if(devMode) {
      // Wrap with watchify and rebundle on changes
      b = watchify(b);
      // Rebundle on update
      b.on('update', bundle);
      bundleLogger.watch(bundleConfig.outputName);
    }

    return bundle();
  };

  // Start bundling with Browserify for each bundleConfig specified
  return mergeStream.apply(gulp, _.map(config.bundles, browserifyThis));

};

gulp.task('browserify', function() {
  return browserifyTask();
});

gulp.task('watchify', function() {
  return browserifyTask(true);
});