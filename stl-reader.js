
;(function() {

  var StlReader = (function() {

    if (typeof DataStream === 'undefined') {
      DataStream = require('./DataStream.js/DataStream.js');
    }

    if (typeof StlAsciiReader === 'undefined') {
      StlAsciiReader = require('./stl-ascii-reader.js');
    }

    if (typeof StlBinaryReader === 'undefined') {
      StlBinaryReader = require('./stl-binary-reader.js');
    }

    var StlReader = function(options) {
    };

    /* Header size is 80 bytes */
    var HEADER_SIZE = 80;

    /* Triangle count size is a 4 byte integer */
    var TRI_COUNT_SIZE = 4;

    /* Per-triangle data size is 50 bytes - 4 vectors (normal plus three
      vertices) each with three 4 byte floats plus an additional 2 byte
      attribute count at the end */
    var PER_TRI_SIZE = 4*(4*3)+2;

    /**
     * Check if the file is too small to be a valid STL file.
     *
     * @param {DataStream} ds the file data as a DataStream
     * @returns {Boolean} true if the file is too small to be valid
     */
    function isTooSmallToBeValid(ds) {
      ds.seek(0);
      if (ds.byteLength < HEADER_SIZE + TRI_COUNT_SIZE) {
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
    function isBinary(ds) {
      ds.seek(0);

      var fileSize = ds.byteLength;

      var skipHeader = ds.readUint8Array(HEADER_SIZE);
      var numTriangles = ds.readUint32();

      if (fileSize == HEADER_SIZE + TRI_COUNT_SIZE + numTriangles*PER_TRI_SIZE) {

        return true;
      }

      return false;
    }

    /**
     * Checks if the ArrayBuffer is valid - that is, the data could
     * theoretically be an STL file
     *
     * @param  {ArrayBuffer} fileData The file as an ArrayBuffer
     * @return {DataStream} the DataStream for the file is valid else null
     */
    function checkValidity(fileData) {

      if (!fileData) {
        return null;
      }

      if (fileData.byteLength === 0) {
        return null;
      }

      var ds = new DataStream(fileData);

      if (isTooSmallToBeValid(ds)) {
        return null;
      }

      return ds;
    }

    /**
     * Reads the triangle vertices of an STL file into a Float32Array. The
     * type of the file - binary/ASCII - is automatically determined and
     * the file is appropriately parsed.
     *
     * @param  {ArrayBuffer} fileData The file as an ArrayBuffer
     * @param {Object} returns an object with vn, vertices amd normals properties
     */
    StlReader.prototype.read = function(fileData) {

      var ds = checkValidity(fileData);

      if (!ds) {
        return null;
      }

      var reader;
      if (isBinary(ds)) {

        reader = new StlBinaryReader();
        ds.seek(0);
        return reader.read(ds);
      } else {

        reader = new StlAsciiReader();
        ds.seek(0);
        return reader.read(ds.readString());
      }
    };

    return StlReader;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = StlReader;
  }

  if (typeof window !== 'undefined') {
    window.StlReader = StlReader;
  }

})();
