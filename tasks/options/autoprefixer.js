module.exports = {

  'build': {
    files: [
      {
        expand: true,
        src: 'styles/*.css',
        ext: '.css'
      }
    ]
  },

  'dev': {
    options: {
      map: true
    },
    files: [
      {
        expand: true,
        src: 'styles/*.css',
        ext: '.css'
      }
    ]
  }

};