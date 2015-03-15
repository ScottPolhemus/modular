module.exports = {

  options: {
    livereload: true
  },

  'scss': {
    options: {
      interrupt: true,
      livereload: false,
      reload: true
    },
    files: [
      'modules/**/*.scss',
      'styles/**/*.scss'
    ],
    tasks: ['sass:dev']
  },

  'css': {
    options: {
      spawn: false
    },
    files: [
      'styles/*.css',
    ],
    tasks: ['autoprefixer']
  },

  'js': {
    files: ['scripts/*.js']
  }

};