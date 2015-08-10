
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

function checkValidData(vn, v, n) {

  // check the first vertex and normal
  var delta = 0.001;

  var vn1 = [0, 0, 0, 0, 0, -1];
  var vn2 = [1, 1, 0, 0, 0, -1];
  var vn5 = [0, 1, 0, 0, 0, -1];

  for (var i = 0; i< 6; i++) {
    expect(vn[i]).to.be.closeTo(vn1[i], delta);
    expect(vn[i+6]).to.be.closeTo(vn2[i], delta);
    expect(vn[i+6*4]).to.be.closeTo(vn5[i], delta);
  }

  for (var i = 0; i< 3; i++) {
    expect(v[i]).to.be.closeTo(vn1[i], delta);
    expect(n[i]).to.be.closeTo(vn1[i+3], delta);
    expect(v[i+3]).to.be.closeTo(vn2[i], delta);
    expect(n[i+3]).to.be.closeTo(vn2[i+3], delta);
    expect(v[i+3*4]).to.be.closeTo(vn5[i], delta);
    expect(n[i+3*4]).to.be.closeTo(vn5[i+3], delta);
  }
}

describe('StlReader', function () {

  it('should have a read and a readAsync function', function () {
    var reader = new StlReader();
    expect(reader.read).to.exist;
  });

  it('should return null for an invalid file', function (done) {
    fs.readFile('test/invalid.stl', function (err, data) {
      var reader = new StlReader();
      reader.read(toArrayBuffer(data), function (vn, v, n) {
        expect(vn).to.be.null;
        expect(v).to.be.null;
        expect(n).to.be.null;
        done();
      });
    });
  });

  it('should return null for an empty file', function (done) {
    fs.readFile('test/empty.stl', function (err, data) {
      var reader = new StlReader();
      reader.read(toArrayBuffer(data), function (vn, v, n) {
        expect(vn).to.be.null;
        expect(v).to.be.null;
        expect(n).to.be.null;
        done();
      });
    });
  });


  it('should read an ascii stl file successfully with the read \
    function', function (done) {
    fs.readFile('test/cube.stl', function (err, data) {
      var reader = new StlReader();
      reader.read(toArrayBuffer(data), function (vn, v, n) {
        expect(vn.length).to.equal(3*2*3*12);
        expect(v.length).to.equal(3*2*3*6);
        expect(n.length).to.equal(3*2*3*6);

        checkValidData(vn, v, n);
        done();
      });
    });
  });

  it('should read a large ascii stl file successfully with the read \
    function', function (done) {
    fs.readFile('test/large-ascii.stl', function (err, data) {
      var reader = new StlReader();
      reader.read(toArrayBuffer(data), function (vn, v, n) {
        expect(vn.length).to.equal(686556);
        expect(v.length).to.equal(343278);
        expect(n.length).to.equal(343278);

        done();
      });
    });
  });

  it('should read a binary stl file successfully with the read \
    function', function (done) {
    fs.readFile('test/cube-binary.stl', function (err, data) {
      var reader = new StlReader();
      reader.read(toArrayBuffer(data), function (vn, v, n) {
        expect(vn.length).to.equal(3*2*3*12);
        expect(v.length).to.equal(3*2*3*6);
        expect(n.length).to.equal(3*2*3*6);

        checkValidData(vn, v, n);
        done();
      });
    });
  });

  it('should read a large binary stl file successfully with the read \
    function', function (done) {
    fs.readFile('test/large-binary.stl', function (err, data) {
      var reader = new StlReader();
      reader.read(toArrayBuffer(data), function (vn, v, n) {
        expect(vn.length).to.equal(68436);
        expect(v.length).to.equal(34218);
        expect(n.length).to.equal(34218);

        done();
      });
    });
  });

});
