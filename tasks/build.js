module.exports = function(grunt) {

  grunt.registerTask('build', [
    'sass:build',
    'autoprefixer:build',
    'browserify:build'
  ]);

};