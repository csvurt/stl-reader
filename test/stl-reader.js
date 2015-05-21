
var expect = require('chai').expect;
var reader = require('../stl-reader');

describe('stl-reader functions', function () {

  it('should have a read function', function () {
    expect(reader.read).to.exist;
  });
});
