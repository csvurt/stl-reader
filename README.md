# StlReader

JavaScript library for parsing STL (Stereolithography) files into interleaved
vertex normal Float32Arrays that can be directly passed into WebGL for
rendering.

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

The returned *vn* array contains interleaved vertex normal data, like so,
[Vx, Vy, Vz, Nx, Ny, Nz, ...] and so on. This is ideal for directly passing
to a vertex shader.

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

This library depends on the [DataStream.js](https://github.com/kig/DataStream.js)
library to read binary STL files. A version of the DataStream.js library is
installed automatically as a dependency when this library is installed
server-side using npm.

## Client-side

```
bower install stl-reader
```

This library depends on the DataStream.js library to read binary STL files. You
therefore will also need to install the DataStream.js library from
[here](https://github.com/kig/DataStream.js). After installation include these
JavaScript files before including the stl-reader related scripts:

```HTML
<script type="text/javascript" src="/bower_components/DataStream.js/encoding-indexes.js"></script>
<script type="text/javascript" src="/bower_components/DataStream.js/encoding.js"></script>
<script type="text/javascript" src="/bower_components/DataStream.js/DataStream.js"></script>
```

Include these three JavaScript files on the page:

```HTML
<script src="/bower_components/stl-reader/stl-ascii-reader.js" type="text/javascript"></script>
<script src="/bower_components/stl-reader/stl-binary-reader.js" type="text/javascript"></script>
<script src="/bower_components/stl-reader/stl-reader.js" type="text/javascript"></script>
```

Use an instance of the FileReader class to read the local file as an ArrayBuffer.

```Javascript
var reader = new FileReader();

reader.onload = function(e) {
  var data = reader.result;
  var stlReader = new StlReader();
  var vn = stlReader.read(data);
};

reader.readAsArrayBuffer(f);
```

The returned *vn* array contains interleaved vertex normal data, like so,
[Vx, Vy, Vz, Nx, Ny, Nz, ...] and so on. This is ideal for directly passing
to a vertex shader.
