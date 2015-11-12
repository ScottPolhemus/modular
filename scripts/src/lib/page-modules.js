/** Find all elements with a data-module attribute and call the corresponding module, if it exists. */
function PageModules() {
  var modules = document.querySelectorAll('[data-module]');

  for (var i = 0; i < modules.length; i++) {
    var el = modules[i];
    var name = el.getAttribute('data-module');

    try {
      // Require module script
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

module.exports = PageModules;