
;(function() {

  var StlAsciiReader = (function() {

    var StlAsciiReader = function(options) {
    };

    /**
     * Read a single facet
     *
     * @param {Array} lines of the STL file
     * @param {Number} idx the index at which the facet starts
     * @returns {Object} an object with the normal and the verts
     */
    StlAsciiReader.readFacet = function (lines, idx) {

    }

    /**
     * Read the STL solid
     *
     * @param {Array} the lines of the STL file
     * @returns {Float32Array} contains the interleaved vertex normal data
     */
    StlAsciiReader.readSolid = function(lines) {

      for (var i = 0; i< lines.length; i++) {
        var lineWords = lines[i].trim().split(' ');
        if (lineWords[0] == 'facet') {
          StlAsciiReader.readFacet(lines, i);
        }
      }
    }

    /**
     * Reads the triangle vertices of an ASCII STL file into a Float32Array
     *
     * @param  {string} fileData The file data as a string
     * @return {Float23Array} contains interleaved vertex normal data
     */
    StlAsciiReader.prototype.read = function(fileData) {
      var lines = fileData.split('\n');
      StlAsciiReader.readSolid(lines);
    };

    return StlAsciiReader;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = StlAsciiReader;
  } else {
    window.StlAsciiReader = StlAsciiReader;
  }

})();
