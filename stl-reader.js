
;(function() {

  var StlReader = (function() {

    if (typeof DataStream === 'undefined') {
      DataStream = require('./DataStream.js/DataStream.js');
    }

    var StlReader = function(options) {
    };

    /**
     * Reads the triangle vertices of an STL file into a Float32Array
     *
     * @param  {ArrayBuffer} fileData The file as an ArrayBuffer
     * @return {Float23Array}
     */
    StlReader.prototype.read = function(fileData) {

      var HEADER_SIZE = 80;
      var TRIANGLE_COUNT_SIZE = 4;
      var VEC3_SIZE = 4*3;
      var ATTR_BYTE_COUNT_SIZE = 2;
      var PER_TRIANGLE_DATA_SIZE = 4*VEC3_SIZE + ATTR_BYTE_COUNT_SIZE;

      function isTooSmallToBeValid(ds) {
        ds.seek(0);
        if (ds.byteLength < HEADER_SIZE + TRIANGLE_COUNT_SIZE) {
          return true;
        }

        return false;
      }

      function isBinary(ds) {
        ds.seek(0);

        var fileSize = ds.byteLength;

        var skipHeader = ds.readUint8Array(HEADER_SIZE);
        var numTriangles = ds.readUint32();

        if (fileSize == HEADER_SIZE + TRIANGLE_COUNT_SIZE +
          numTriangles*PER_TRIANGLE_DATA_SIZE) {

          return true;
        }

        return false;
      }

      var ds = new DataStream(fileData);

      if (isTooSmallToBeValid(ds)) {
        return null;
      }

      if (isBinary(ds)) {
        console.log('Binary STL');
      } else {
        console.log('ASCII STL');
      }
    };

    return StlReader;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = StlReader;
  } else {
    window.StlReader = StlReader;
  }

})();
