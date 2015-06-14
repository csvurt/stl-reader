
;(function() {

  var StlReader = (function() {

    if (typeof DataStream === 'undefined') {
      DataStream = require('./DataStream.js/DataStream.js');
    }

    if (typeof StlAsciiReader === 'undefined') {
      StlAsciiReader = require('./stl-ascii-reader.js');
    }

    var StlReader = function(options) {
    };

    /* Header size is 80 bytes */
    StlReader.HEADER_SIZE = 80;

    /* Triangle count size is a 4 byte integer */
    StlReader.TRI_COUNT_SIZE = 4;

    /* Per-triangle data size is 50 bytes - 4 vectors (normal plus three
      vertices) each with three 4 byte floats plus an additional 2 byte
      attribute count at the end */
    StlReader.PER_TRI_SIZE = 4*(4*3)+2;

    /** 
     * Check if the file is too small to be a valid STL file.
     *
     * @param {DataStream} ds the file data as a DataStream
     * @returns {Boolean} true if the file is too small to be valid
     */
    StlReader.isTooSmallToBeValid = function (ds) {
      ds.seek(0);
      if (ds.byteLength < StlReader.HEADER_SIZE + StlReader.TRI_COUNT_SIZE) {
        return true;
      }

      return false;
    }

    /** 
     * Check if the file is a binary STL file.
     *
     * @param {DataStream} ds the file data as a DataStream
     * @returns {Boolean} true if the file is a binary STL file
     */
    StlReader.isBinary = function (ds) {
      ds.seek(0);

      var fileSize = ds.byteLength;

      var skipHeader = ds.readUint8Array(StlReader.HEADER_SIZE);
      var numTriangles = ds.readUint32();

      if (fileSize == StlReader.HEADER_SIZE + StlReader.TRI_COUNT_SIZE +
        numTriangles*StlReader.PER_TRI_SIZE) {

        return true;
      }

      return false;
    }

    /**
     * Reads the triangle vertices of an STL file into a Float32Array
     *
     * @param  {ArrayBuffer} fileData The file as an ArrayBuffer
     * @return {Float23Array}
     */
    StlReader.prototype.read = function(fileData) { 

      if (fileData.byteLength == 0) {
        return null;
      }

      var ds = new DataStream(fileData);

      if (StlReader.isTooSmallToBeValid(ds)) {
        return null;
      }

      if (StlReader.isBinary(ds)) {

      } else {
        var reader = new StlAsciiReader();
        reader.read(fileData);
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
