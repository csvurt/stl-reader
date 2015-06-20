
;(function() {

  var StlBinaryReader = (function() {

    var StlBinaryReader = function(options) {
    };

    /* Header size is 80 bytes */
    StlBinaryReader.HEADER_SIZE = 80;

    /**
     * Reads the binary STL header
     *
     * @param  {DataStream} ds the file DataStream object
     */
    StlBinaryReader.readHeader = function (ds) {
      ds.readUint8Array(StlBinaryReader.HEADER_SIZE);
    };

    /**
     * Reads the binary STL triangles
     *
     * @param  {DataStream} ds the file DataStream object
     * @returns {Float32Array} the typed array with the interleaved data.
     */
    StlBinaryReader.readTriangles = function (ds) {

      var numTri = ds.readUint32();
      var typedArray = new Float32Array(numTri*3*2*3);

      // TODO: read the triangles into the typed array

      return typedArray;
    };

    /**
     * Reads the triangle vertices of a binary STL file into a Float32Array
     *
     * @param  {DataStream} ds The file data as a DataStream object
     * @return {Float23Array} contains interleaved vertex normal data
     */
    StlBinaryReader.prototype.read = function(ds) {

      StlBinaryReader.readHeader(ds);
    };

    return StlBinaryReader;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = StlBinaryReader;
  } else {
    window.StlBinaryReader = StlBinaryReader;
  }

})();
