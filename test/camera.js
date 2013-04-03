/**
 * Module Dependencies
 */

var Camera = require('phonegap-camera'),
    assert = require('component-assert');

/**
 * Add camera for tests
 */

navigator.camera = {};

/**
 * Example datauri
 */

datauri = 'R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub//ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcppV0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7';

/**
 * Tests
 */

describe('Camera', function () {
  var camera;

  beforeEach(function() {
    camera = new Camera;
  });


  describe('.supported()', function () {

    it('should return false, when phonegap not present', function () {
      navigator.camera = undefined;
      assert(false == Camera.supported());
    });

    it('should return true, when navigator.camera is present', function () {
      navigator.camera = {}
      assert(true == Camera.supported());
    });

  });

  describe('capture', function () {

    it('should turn a datauri into a blob', function () {
      navigator.camera.getPicture = function(success, error, options) {
        assert(1 === options.sourceType);
        assert(0 === options.destinationType);
        return success(datauri);
      };

      camera.capture(function(err, base64) {
        assert(!err);
        assert('string' == typeof base64);
      })
    });

    it('should handle errors', function () {
      navigator.camera.getPicture = function(success, error, options) {
        assert(1 === options.sourceType);
        assert(0 === options.destinationType);
        return error('oh noz')
      };

      camera.capture(function(err, blob) {
        assert(err);
        assert(!blob);
      })
    });

  });

  describe('select', function () {

    it('should turn selected image into blob', function() {
      navigator.camera.getPicture = function(success, error, options) {
        assert(0 === options.sourceType);
        assert(0 === options.destinationType);
        return success(datauri);
      };

      camera.select(function(err, base64) {
        assert(!err);
        assert('string' == typeof base64)
      })
    });

    it('should handle errors', function () {
      navigator.camera.getPicture = function(success, error, options) {
        assert(0 === options.sourceType);
        assert(0 === options.destinationType);
        return error('oh noz')
      };

      camera.select(function(err, blob) {
        assert(err);
        assert(!blob);
      })
    });
  });

});
