
# phonegap-camera

  simple wrapper for phonegap camera api.

## Installation

    $ component install matthewmueller/phonegap-camera

## Example

```js
camera = new Camera;

// capture a photo
camera.capture(function(err, str) {
  if(err) throw err;
  console.log(str);
});
```

## API

### `Camera`

Inititialize a new `Camera`.

### `.capture(fn)`

Capture a new photo on your phone's camera. The callback `fn` has the signature `function(err, str)` where `str` is a Base64 string.

### `.select(fn)`

Select a new photo from your photo library. The callback `fn` has the signature `function(err, str)` where `str` is a Base64 string.

### `Camera.supported()`

Check to see if the camera is supported.

```js
if(Camera.supported()) {
  var camera = new Camera;
  camera.select(onselect);
}
```

## Test

    make test

## License

  MIT
