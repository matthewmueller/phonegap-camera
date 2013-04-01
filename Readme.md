
# phonegap-camera

  simple wrapper for phonegap camera api.

## Installation

    $ component install matthewmueller/phonegap-camera

## Example

```js
camera = new Camera;

// capture a photo
camera.capture(function(err, blob) {
  if(err) throw err;
  console.log(blob);
});
```

## API

### `Camera`

Inititialize a new `Camera`.

### `.capture(fn)`

Capture a new photo on your phone's camera. The callback `fn` has the signature `function(err, blob)` where `blob` is a [File Blob](https://developer.mozilla.org/en-US/docs/DOM/Blob)

### `.select(fn)`

Select a photo from your phone's photo library. The callback `fn` has the signature `function(err, blob)` where `blob` is a [File Blob](https://developer.mozilla.org/en-US/docs/DOM/Blob).

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
