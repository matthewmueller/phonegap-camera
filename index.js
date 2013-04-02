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
    var blob = base64toBlob(data, 'image/jpeg');
    self.emit('capture', blob);
    fn && fn(null, blob);
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

/**
 * Base64 to Blob
 *
 * @param {String} base64
 * @param {String} mime
 * @return {Blob} blob
 * @api private
 */

function base64toBlob(base64, mime) {
  var bytes = atob(base64),
      ab = new ArrayBuffer(bytes.length),
      ia = new Uint8Array(ab);

  for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
  }

  return new Blob([ab], { type: mime });
}
