var Flickity = require('flickity');

/**
 * Initialize a carousel module with Flickity.
 * @constructor
 * @param {Object} element - The DOM element for this instance
 */
function Carousel(element) {
  this.el = element;
  this.flickity = new Flickity(this.el);
}

module.exports = Carousel;