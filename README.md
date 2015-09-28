# StlReader

[![License](https://img.shields.io/badge/license-MIT-yellowgreen.svg)](http://opensource.org/licenses/MIT)

JavaScript library for parsing STL (Stereolithography) files into interleaved
vertex normal Float32Arrays that can be directly passed into WebGL or used with
a library like [three.js](http://threejs.org/) for rendering.

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
fs.readFile('test/cube.stl', function (err, data) {
  var res = StlReader.read(toArrayBuffer(data));

  console.log(res.vn);
  console.log(res.vertices);
  console.log(res.normals);
});
```

The returned *res* object contains three properties - 'vn', 'vertices' and
'normals'. *vn* is a Float32Array that contains interleaved vertex
normal data, like so, [Vx, Vy, Vz, Nx, Ny, Nz, ...] and so on. This is ideal
for directly passing to a vertex shader. The *vertices* and *normals* arrays
contain the vertices and normals separately. These can be used with a library
like [three.js](http://threejs.org/) for rendering.

The *read* function takes as input an ArrayBuffer. You can use the function
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

### Installation

```
bower install stl-reader
```

### Usage

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

reader.onload = function () {
  var stlReader, data;

  data = reader.result;
  stlReader = new StlReader();
  var res = stlReader.read(data);

  console.log(res.vn);
  console.log(res.vertices);
  console.log(res.normals);
};

reader.readAsArrayBuffer(fileData);
```

The returned *res* object contains three properties - 'vn', 'vertices' and
'normals'. *vn* is a Float32Array that contains interleaved vertex
normal data, like so, [Vx, Vy, Vz, Nx, Ny, Nz, ...] and so on. This is ideal
for directly passing to a vertex shader. The *vertices* and *normals* arrays
contain the vertices and normals separately. These can be used with a library
like [three.js](http://threejs.org/) for rendering:


```Javascript
var res = StlReader.read(data);

var geometry = new THREE.BufferGeometry();
geometry.addAttribute('position', new THREE.BufferAttribute(res.vertices, 3));
geometry.addAttribute('normal', new THREE.BufferAttribute(res.normals, 3));
mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
```

where, *material* is the material you want to render the mesh with and *scene*
is the three.js scene object to which you want to add the mesh.
