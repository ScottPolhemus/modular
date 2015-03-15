module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json')
  };

  // Load config options from the "tasks/options" folder
  grunt.util._.extend(config, loadConfig('./tasks/options/'));

  grunt.initConfig(config);

  // Load tasks from the "tasks" folder
  grunt.loadTasks('tasks');
};

// http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
function loadConfig(path) {
  var glob = require('glob');
  var object = {};
  var key;

  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');

    object[key] = require(path + option);
    
  });

  return object;
}