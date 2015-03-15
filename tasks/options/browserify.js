var path = require('path');
var glob = require('glob');

module.exports = {

  options: {
    alias: function() {
      var aliasArray = [];

      var moduleFiles = glob.sync('modules/**/*.js');

      for(var i = 0; i < moduleFiles.length; i++) {
        var name = path.basename(moduleFiles[i], '.js');
        var dirName = path.basename(path.dirname(moduleFiles[i]));

        aliasArray.push('./'+moduleFiles[i]+':'+'modules/'+name);
      }

      return aliasArray;
    }()
  },

  'build': {
    files: {
      'scripts/main.js': ['scripts/src/main.js']
    }
  },

  'dev': {
    options: {
      watch: true,
      browserifyOptions: {
        debug: true
      }
    },
    files: {
      'scripts/main.js': ['scripts/src/main.js']
    }
  }

};