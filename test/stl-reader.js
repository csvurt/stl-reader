
var expect = require('chai').expect;
var fs = require('fs');

var StlReader = require('../stl-reader');

function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}

describe('StlReader functions', function () {

  it('should have a read function', function () {
    var reader = new StlReader();
    expect(reader.read).to.exist;
  });

  it('should return null for an invalid file', function () {
    var data = fs.readFileSync('test/invalid.stl');
    var reader = new StlReader();
    var vn = reader.read(toArrayBuffer(data));
    expect(vn).to.be.null;
  });

  it('should return null for an empty file', function () {
    var data = fs.readFileSync('test/empty.stl');
    var reader = new StlReader();
    var vn = reader.read(toArrayBuffer(data));
    expect(vn).to.be.null;
  });

  it('should read an ascii stl file successfully', function () {
    var data = fs.readFileSync('test/cube.stl');
    var reader = new StlReader();
    var vn = reader.read(toArrayBuffer(data));
    expect(vn.length).to.equal(3*2*3*12);
  });

  it('should read a binary stl file successfully', function () {
    var data = fs.readFileSync('test/cube-binary.stl');
    var reader = new StlReader();
    var vn = reader.read(toArrayBuffer(data));
    expect(vn.length).to.equal(3*2*3*12);
  });
});
