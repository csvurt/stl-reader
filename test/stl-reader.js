
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

describe('StlReader', function () {

  it('should have a read function', function () {
    var reader = new StlReader();
    expect(reader.read).to.exist;
  });

  it('should have an isBinary function', function () {
    var reader = new StlReader();
    expect(reader.isBinary).to.exist;
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

  it('should determine correctly if a file is a binary STL', function () {
    var data = fs.readFileSync('test/cube-binary.stl');
    var reader = new StlReader();
    var isBinary = reader.isBinary(toArrayBuffer(data));
    expect(isBinary).to.be.true;
  });

  it('should determine correctly if a file is an ASCII STL', function () {
    var data = fs.readFileSync('test/cube.stl');
    var reader = new StlReader();
    var isBinary = reader.isBinary(toArrayBuffer(data));
    expect(isBinary).to.be.false;
  });

  it('should read an ascii stl file successfully with the read \
    function', function () {
    var data = fs.readFileSync('test/cube.stl');
    var reader = new StlReader();
    var vn = reader.read(toArrayBuffer(data));
    expect(vn.length).to.equal(3*2*3*12);

    // check the first vertex and normal
    var delta = 0.001;
    expect(vn[0]).to.be.closeTo(0, delta);
    expect(vn[1]).to.be.closeTo(0, delta);
    expect(vn[2]).to.be.closeTo(0, delta);

    expect(vn[3]).to.be.closeTo(0, delta);
    expect(vn[4]).to.be.closeTo(0, delta);
    expect(vn[5]).to.be.closeTo(-1, delta);
  });

  it('should read an ascii stl file successfully with the readAscii \
    function', function () {
    var data = fs.readFileSync('test/cube.stl');
    var reader = new StlReader();
    var vn = reader.readAscii(data.toString());
    expect(vn.length).to.equal(3*2*3*12);

    // check the first vertex and normal
    var delta = 0.001;
    expect(vn[0]).to.be.closeTo(0, delta);
    expect(vn[1]).to.be.closeTo(0, delta);
    expect(vn[2]).to.be.closeTo(0, delta);

    expect(vn[3]).to.be.closeTo(0, delta);
    expect(vn[4]).to.be.closeTo(0, delta);
    expect(vn[5]).to.be.closeTo(-1, delta);
  });

  it('should read a binary stl file successfully with the read \
    function', function () {
    var data = fs.readFileSync('test/cube-binary.stl');
    var reader = new StlReader();
    var vn = reader.read(toArrayBuffer(data));
    expect(vn.length).to.equal(3*2*3*12);

    // check the first vertex and normal
    var delta = 0.001;
    expect(vn[0]).to.be.closeTo(0, delta);
    expect(vn[1]).to.be.closeTo(0, delta);
    expect(vn[2]).to.be.closeTo(0, delta);

    expect(vn[3]).to.be.closeTo(0, delta);
    expect(vn[4]).to.be.closeTo(0, delta);
    expect(vn[5]).to.be.closeTo(-1, delta);
  });

  it('should read a binary stl file successfully with the readBinary \
    function', function () {
    var data = fs.readFileSync('test/cube-binary.stl');
    var reader = new StlReader();
    var isBinary = reader.isBinary(toArrayBuffer(data));
    expect(isBinary).to.be.true;

    var vn = reader.readBinary();
    expect(vn.length).to.equal(3*2*3*12);

    // check the first vertex and normal
    var delta = 0.001;
    expect(vn[0]).to.be.closeTo(0, delta);
    expect(vn[1]).to.be.closeTo(0, delta);
    expect(vn[2]).to.be.closeTo(0, delta);

    expect(vn[3]).to.be.closeTo(0, delta);
    expect(vn[4]).to.be.closeTo(0, delta);
    expect(vn[5]).to.be.closeTo(-1, delta);
  });
});
