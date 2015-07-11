
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
    };

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
    };

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
    };

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

      return facet;
    };

    /**
     * Read the STL solid
     *
     * @param {Array} the lines of the STL file
     * @returns {Array} contains the facet data
     */
    StlAsciiReader.readSolid = function(lines) {

      var facets = [];
      for (var i = 0; i< lines.length; i++) {
        var lineWords = lines[i].trim().split(' ');
        if (lineWords[0] == 'facet') {
          var facet = StlAsciiReader.readFacet(lines, i);
          facets.push(facet);

          // skip to the next facet
          i += 6;
        }
      }

      return facets;
    };

    /**
     * Converts the facets into a Float32Array with interleaved vertex and
     * normal data.
     *
     * @param {Array} facets the array of facets
     * @return {Float32Array} contains the interleaved vertex normal data
     */
    StlAsciiReader.convertFacetsToFloat32Array = function (facets) {

      var floatArray = new Float32Array(facets.length*3*2*3);
      for (var i = 0; i< facets.length; i++) {

        var normal = facets[i].normal;
        for (var j = 0; j < 3; j++) {
          for (var k = 0; k < 3; k++) {
            floatArray[i*18+j*6+k] = facets[i].verts[j][k];
          }

          // copy the normal after each vertex
          for (k = 0; k < 3; k++) {
            floatArray[i*18+j*6+3+k] = facets[i].normal[k];
          }
        }
      }

      return floatArray;
    };

    /**
     * Reads the triangle vertices of an ASCII STL file into a Float32Array
     *
     * @param  {string} fileData The file data as a string
     * @return {Float23Array} contains interleaved vertex normal data
     */
    StlAsciiReader.prototype.read = function(fileData) {
      var lines = fileData.split('\n');
      var facets = StlAsciiReader.readSolid(lines);
      var floatArray = StlAsciiReader.convertFacetsToFloat32Array(facets);
      return floatArray;
    };

    return StlAsciiReader;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = StlAsciiReader;
  } else {
    window.StlAsciiReader = StlAsciiReader;
  }

})();
