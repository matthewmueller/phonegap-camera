/**
 * Module Dependencies
 */

var debug = require('debug')('phonegap:camera'),
    Emitter = require('emitter');

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
 * Capture a picture and return a base64 string
 *
 * @param {Number} [type]
 * @param {Function} fn
 * @return {Camera}
 * @api public
 */

Camera.prototype.capture = function(type, fn) {
  var self = this;
  if ('function' == typeof type) {
    fn = type;
    type = 0; // DestinationType.DATA_URL
  }

  this.camera.getPicture(success, error, {
    destinationType: type,
    sourceType: 1 // PictureSourceType.CAMERA
  });

  function success(data) {
    debug('took picture');
    self.emit('capture', data);
    fn && fn(null, data);
  }

  function error(err) {
    debug('error taking picture %s', err);
    self.emit('error', err);
    fn && fn(err);
  }

  return this;
};

/**
 * Select a photo from the photo library
 *
 * TODO: blob support
 *
 * @param {Number} [type]
 * @param {Function} fn
 * @return {Camera}
 * @api public
 */

Camera.prototype.select = function(type, fn) {
  var self = this;

  if ('function' == typeof type) {
    fn = type;
    type = 0; // DestinationType.DATA_URL
  }

  this.camera.getPicture(success, error, {
    destinationType: type, 
    sourceType: 0 // PictureSourceType.PHOTOLIBRARY
  });

  function success(data) {
    debug('selected picture');
    self.emit('select', data);
    fn && fn(null, data);
  }

  function error(err) {
    debug('error selecting picture %s', err);
    self.emit('error', err);
    fn && fn(err);
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
