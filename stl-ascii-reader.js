
;(function() {

  var StlAsciiReader = (function() {

    var StlAsciiReader = function(options) {
    };

    /**
     * Split line into words
     *
     * @param {String} line containing words
     * @returns {Array} containing the words
     */
    StlAsciiReader.splitLineIntoWords = function (line) {
      
      var lineWords = line.trim().split(' ');
      
      for (var i = lineWords.length-1; i >= 0; i--) {
        if (lineWords[i].length === 0) {
          lineWords.splice(i, 1);
        }
      }

      return lineWords;
    }

    /**
     * Read a single vertex
     *
     * @param {String} line containing the vertex
     * @returns {Array} containing the vertex coordinates 
     */
    StlAsciiReader.readVertex = function (line) {

      var lineWords = StlAsciiReader.splitLineIntoWords(line);
      var vertex = [];

      for (var i = 0; i< 3; i++) {
        vertex.push(parseFloat(lineWords[1+i]));
      }

      return vertex;
    }

    /**
     * Read a single normal
     *
     * @param {String} line containing the normal
     * @returns {Array} contaning the normal coordinates
     */
    StlAsciiReader.readNormal = function (line) {
      
      var lineWords = StlAsciiReader.splitLineIntoWords(line);
      var normal = [];

      for (var i = 0; i< 3; i++) {
        normal.push(parseFloat(lineWords[2+i]));
      }

      return normal;
    }

    /**
     * Read a single facet
     *
     * @param {Array} lines of the STL file
     * @param {Number} idx the index at which the facet starts
     * @returns {Object} an object with the normal and the verts
     */
    StlAsciiReader.readFacet = function (lines, idx) {

      var facet = {};
      facet.normal = StlAsciiReader.readNormal(lines[idx]);
      facet.verts = [];
      facet.verts.push(StlAsciiReader.readVertex(lines[idx+2]));
      facet.verts.push(StlAsciiReader.readVertex(lines[idx+3]));
      facet.verts.push(StlAsciiReader.readVertex(lines[idx+4]));
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
