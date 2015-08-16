
;(function() {

  var StlAsciiReader = (function() {

    var StlAsciiReader = function(options) {
    };

    /* Number of lines per facet in the STL file */
    var LINES_PER_FACET = 7;

    /* Number of floating point values in a triangle */
    var NUM_FLOATS_IN_TRI = 18;

    /**
     * Split line into words
     *
     * @param {String} line containing words
     * @returns {Array} containing the words
     */
    function splitLineIntoWords(line) {

      var lineWords = line.trim().split(' ');

      for (var i = lineWords.length-1; i >= 0; i--) {
        if (lineWords[i].length === 0) {
          lineWords.splice(i, 1);
        }
      }

      return lineWords;
    }

    /**
     * Read a vector
     *
     * @param {String} line containing the vector
     * @param {Number} idx index of word from where to read
     * @returns {Array} containing the vertex coordinates
     */
    function readVector(line, idx) {

      var lineWords = splitLineIntoWords(line);
      var vector = [];

      for (var i = 0; i< 3; i++) {
        vector.push(parseFloat(lineWords[idx+i]));
      }

      return vector;
    }

    /**
     * Read a single vertex
     *
     * @param {String} line containing the vertex
     * @returns {Array} containing the vertex coordinates
     */
    function readVertex(line) {

      return readVector(line, 1);
    }

    /**
     * Read a single normal
     *
     * @param {String} line containing the normal
     * @returns {Array} contaning the normal coordinates
     */
    function readNormal(line) {

      return readVector(line, 2);
    }

    /**
     * Read a single facet
     *
     * @param {Array} lines of the STL file
     * @param {Number} idx the index at which the facet starts
     * @returns {Object} an object with the normal and the verts
     */
    function readFacet(lines, idx) {

      var facet = {};
      facet.normal = readNormal(lines[idx]);
      facet.verts = [];
      facet.verts.push(readVertex(lines[idx+2]));
      facet.verts.push(readVertex(lines[idx+3]));
      facet.verts.push(readVertex(lines[idx+4]));

      return facet;
    }

    /**
     * Converts the facets into a Float32Array with interleaved vertex and
     * normal data.
     *
     * @param {Object} facet the facet object with the vertices and normal
     * @param {Float32Array} vn the interleaved vertex normal data to be populated
     * @param {Float32Array} v the vertex data to be populated
     * @param {Float32Array} n the normal data to be populated
     * @param {Number} idx the index at which to insert the facet data
     */
    function pushFacetIntoFloat32Array(facet, vn, v, n, idx) {

      var normal = facet.normal;
      for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 3; k++) {
          vn[idx+j*6+k] = facet.verts[j][k];
          v[idx/2+j*3+k] = facet.verts[j][k];
        }

        // copy the normal after each vertex
        for (k = 0; k < 3; k++) {
          vn[idx+j*6+3+k] = facet.normal[k];
          n[idx/2+j*3+k] = facet.normal[k];
        }
      }
    }

    /**
     * Read the STL solid
     *
     * @param {Array} lines the lines of the STL file
     * @param {Float32Array} vn the interleaved vertex normal data to be populated
     * @param {Float32Array} v the vertex data to be populated
     * @param {Float32Array} n the normal data to be populated
     */
    function readSolid(lines, vn, v, n) {

      var facetCount = 0;

      for (var i = 0; i< lines.length; i++) {
        var lineWords = lines[i].trim().split(' ');
        if (lineWords[0] == 'facet') {
          var facet = readFacet(lines, i);

          pushFacetIntoFloat32Array(facet, vn, v, n, facetCount*NUM_FLOATS_IN_TRI);
          facetCount += 1;

          // skip to the next facet
          i += 6;
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

      var numTriangles = parseInt(lines.length/LINES_PER_FACET);
      var vn = new Float32Array(numTriangles*NUM_FLOATS_IN_TRI);
      var v = new Float32Array(numTriangles*NUM_FLOATS_IN_TRI/2);
      var n = new Float32Array(numTriangles*NUM_FLOATS_IN_TRI/2);

      readSolid(lines, vn, v, n);
      return {
        vn: vn,
        vertices: v,
        normals: n
      };
    };

    return StlAsciiReader;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = StlAsciiReader;
  }

  if (typeof window !== 'undefined') {
    window.StlAsciiReader = StlAsciiReader;
  }

})();
