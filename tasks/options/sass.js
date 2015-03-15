var glob = require('glob');

module.exports = {

  options: {
    includePaths: function() {
      // Include all module subdirectories
      return glob.sync('modules/**/');
    }()
  },

  'build': {
    files: [
      {
        expand: true,
        flatten: true,
        src: 'styles/src/*.scss',
        dest: 'styles/',
        ext: '.css'
      }
    ]
  },

  'dev': {
    options: {
      sourceMap: true,
      sourceMapEmbed: true
    },
    files: [
      {
        expand: true,
        flatten: true,
        src: 'styles/src/*.scss',
        dest: 'styles/',
        ext: '.css'
      }
    ]
  }

};