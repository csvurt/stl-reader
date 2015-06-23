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

```JavaScript
var fs = require('fs');
var StlReader = require('stl-reader');
...
var data = fs.readFileSync('test/cube-binary.stl');
var stlReader = new StlReader();
var vn = stlReader.read(toArrayBuffer(data));
```

The *read()* function takes as input an ArrayBuffer. You can use the function
below to convert a Node Buffer to an ArrayBuffer (see discussion regarding this
code snippet [here](http://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer)).

```JavaScript
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

On the client-side use an instance of the FileReader class to read the local
file as an ArrayBuffer.

```Javascript
var reader = new FileReader();

reader.onload = function(e) {
  var data = reader.result;
  var stlReader = new StlReader();
  var vn = stlReader.read(data);
};

reader.readAsArrayBuffer(f);
```
