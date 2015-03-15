module.exports = function(grunt) {

  grunt.registerTask('dev', [
    'sass:dev',
    'autoprefixer:dev',
    'browserify:dev',
    'watch'
  ]);

};