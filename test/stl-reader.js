
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

function checkValidData(vn) {

  // check the first vertex and normal
  var delta = 0.001;

  var vn1 = [0, 0, 0, 0, 0, -1];
  var vn2 = [1, 1, 0, 0, 0, -1];
  var vn5 = [0, 1, 0, 0, 0, -1];

  for (var i = 0; i< 3; i++) {
    expect(vn[i]).to.be.closeTo(vn1[i], delta);
    expect(vn[i+6]).to.be.closeTo(vn2[i], delta);
    expect(vn[i+6*4]).to.be.closeTo(vn5[i], delta);
  }

  /*
  expect(vn[0]).to.be.closeTo(0, delta);
  expect(vn[1]).to.be.closeTo(0, delta);
  expect(vn[2]).to.be.closeTo(0, delta);

  expect(vn[3]).to.be.closeTo(0, delta);
  expect(vn[4]).to.be.closeTo(0, delta);
  expect(vn[5]).to.be.closeTo(-1, delta);

  // second vertex and normal
  expect(vn[6]).to.be.closeTo(1, delta);
  expect(vn[7]).to.be.closeTo(1, delta);
  expect(vn[8]).to.be.closeTo(0, delta);

  expect(vn[9]).to.be.closeTo(0, delta);
  expect(vn[10]).to.be.closeTo(0, delta);
  expect(vn[11]).to.be.closeTo(-1, delta);

  // skipping the third and fourth vertices

  // check fifth vertex and normal
  expect(vn[24]).to.be.closeTo(0, delta);
  expect(vn[25]).to.be.closeTo(1, delta);
  expect(vn[26]).to.be.closeTo(0, delta);

  expect(vn[27]).to.be.closeTo(0, delta);
  expect(vn[28]).to.be.closeTo(0, delta);
  expect(vn[29]).to.be.closeTo(-1, delta);
  */
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
    fs.readFile('test/invalid.stl', function (err, data) {
      var reader = new StlReader();
      var vn = reader.read(toArrayBuffer(data));
      expect(vn).to.be.null;
      done();
    });
  });

  it('should return null for an empty file', function () {
    fs.readFile('test/empty.stl', function (err, data) {
      var reader = new StlReader();
      var vn = reader.read(toArrayBuffer(data));
      expect(vn).to.be.null;
      done();
    });
  });

  it('should determine correctly if a file is a binary STL', function () {
    fs.readFile('test/cube-binary.stl', function (err, data) {
      var reader = new StlReader();
      var isBinary = reader.isBinary(toArrayBuffer(data));
      expect(isBinary).to.be.true;
      done();
    });
  });

  it('should determine correctly if a file is an ASCII STL', function () {
    fs.readFile('test/cube.stl', function (err, data) {
      var reader = new StlReader();
      var isBinary = reader.isBinary(toArrayBuffer(data));
      expect(isBinary).to.be.false;
      done();
    });
  });

  it('should read an ascii stl file successfully with the read \
    function', function () {
    fs.readFile('test/cube.stl', function (err, data) {
      var reader = new StlReader();
      var vn = reader.read(toArrayBuffer(data));
      expect(vn.length).to.equal(3*2*3*12);

      checkValidData(vn);
      done();
    });
  });

  it('should read an ascii stl file successfully with the readAscii \
    function', function () {
    fs.readFile('test/cube.stl', function (err, data) {
      var reader = new StlReader();
      var vn = reader.readAscii(data.toString());
      expect(vn.length).to.equal(3*2*3*12);

      checkValidData(vn);
      done();
    });
  });

  it('should read a binary stl file successfully with the read \
    function', function () {
    fs.readFile('test/cube-binary.stl', function (err, data) {
      var reader = new StlReader();
      var vn = reader.read(toArrayBuffer(data));
      expect(vn.length).to.equal(3*2*3*12);

      checkValidData(vn);
      done();
    });
  });

  it('should read a binary stl file successfully with the readBinary \
    function', function () {
    fs.readFile('test/cube-binary.stl', function (err, data) {
      var abData = toArrayBuffer(data);

      var reader = new StlReader();
      var isBinary = reader.isBinary(abData);
      expect(isBinary).to.be.true;

      var vn = reader.readBinary(abData);
      expect(vn.length).to.equal(3*2*3*12);

      checkValidData(vn);
      done();
    });
  });

});
