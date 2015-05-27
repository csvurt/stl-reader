
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

      function isValid(ds) {
        ds.seek(0);
        if (ds.byteLength < 80+4) {
          return false;
        }

        return true;
      }

      function isBinary(ds) {
        ds.seek(0);

        var fileSize = ds.byteLength;

        var skipHeader = ds.readUint8Array(80);
        var numTriangles = ds.readUint32();
        if (fileSize == 80+4+numTriangles*4*4*3) {
          return true;
        }

        return false;
      }

      var ds = new DataStream(fileData);

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
