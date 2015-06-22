# stl-reader

JavaScript library for parsing STL (Stereolithography) files into interleaved
vertex normal Float32Arrays that can be directly passed into WebGL for
rendering.

**Work in progress. Not ready yet. Do not use.**

## Server-side

### Installation

```
npm install stl-reader
```

### Usage

```
var fs = require('fs');
var StlReader = require('stl-reader');
...
var data = fs.readFileSync('test/cube-binary.stl');
var reader = new StlReader();
var vn = reader.read(data.toArrayBuffer());
```

The *read()* function takes as input an ArrayBuffer. In Node 0.12+ you can
convert a Node Buffer to an ArrayBuffer by calling the toArrayBuffer() on the
Node Buffer. In older versions of Node use the function below to convert a Node
Buffer to an ArrayBuffer (see discussion regarding this code [here](http://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer)).

```
function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}
```

## Client-side

```
bower install stl-reader
```

