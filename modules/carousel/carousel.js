var Flickity = require('flickity');

function Carousel(element) {
  this.el = element;
  this.flickity = new Flickity(this.el);
}

module.exports = Carousel;