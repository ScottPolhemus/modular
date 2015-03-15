window.onload = function() {
  new ModularPage(document);
}

function ModularPage(doc) {
  var modules = doc.querySelectorAll('[data-module-name]');

  for (var i = 0; i < modules.length; i++) {
    var el = modules[i];
    var name = el.getAttribute('data-module-name');

    try {
      // Require module script (aliased with Grunt task)
      var Module = require('modules/'+name);
    } catch(e) {
      var Module = false;
    }

    if(Module) {
      // Initialize the module
      new Module(el);
    }
  }
}