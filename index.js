/**
 * Module Dependencies
 */

var debug = require('debug')('phonegap:camera'),
    Emitter = require('emitter'),
    toBlob = require('data-uri-to-blob');

/**
 * Export `Camera`
 */

module.exports = Camera;

/**
 * Initialize `Camera`
 */

function Camera() {
  if(!(this instanceof Camera)) return new Camera;
  this.camera = navigator.camera;
}

/**
 * Mixin `Emitter`
 */

Emitter(Camera.prototype);

/**
 * Capture a picture and return a file blob
 *
 * @param {Function} fn
 * @return {Camera}
 * @api public
 */

Camera.prototype.capture = function(fn) {
  var self = this;

  this.camera.getPicture(success, error, {
    destinationType: 0, // DestinationType.DATA_URL
    sourceType: 1 // PictureSourceType.CAMERA
  });

  function success(data) {
    debug('took picture');
    var blob = toBlob(data);
    self.emit('capture', blob);
    return fn(null, blob);
  }

  function error(err) {
    debug('error taking picture %s', err);
    self.emit('error', err);
    return fn(err);
  }

  return this;
};

/**
 * Select a photo from the photo library
 *
 * @param {Function} fn
 * @return {Camera}
 * @api public
 */

Camera.prototype.select = function(fn) {
  var self = this;

  this.camera.getPicture(success, error, {
    destinationType: 0, // DestinationType.DATA_URL
    sourceType: 0 // PictureSourceType.PHOTOLIBRARY
  });

  function success(data) {
    debug('selected picture');
    var blob = toBlob(data);
    self.emit('select', blob);
    return fn(null, blob);
  }

  function error(err) {
    debug('error selecting picture %s', err);
    self.emit('error', err);
    return fn(err);
  }

  return this;
};

/**
 * Supported static method
 *
 * @return {Boolean}
 * @api public
 */

Camera.supported = function() {
  if(navigator && navigator.camera) return true;
  return false;
};
