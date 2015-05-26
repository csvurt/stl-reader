
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

      var ds = new DataStream(fileData);

      var skipHeader = ds.readUint8Array(80);
      var numTriangles = ds.readUint32();
      if (numTriangles > 0 && numTriangles < Math.pow(2, 32)) {
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
