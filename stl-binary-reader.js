
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
