
;(function() {

  var StlBinaryReader = (function() {

    var StlBinaryReader = function(options) {
    };

    /* Header size is 80 bytes */
    var HEADER_SIZE = 80;

    /**
     * Reads the binary STL header
     *
     * @param  {DataStream} ds the file DataStream object
     */
    function readHeader(ds) {
      ds.readUint8Array(HEADER_SIZE);
    }

    /**
     * Copy a vert/normal into an existing array
     *
     * @param {Float32Array} vec the vector to copy
     * @param {Float32Array} arr the array to copy into
     * @param {number} idx the index from which to start copying
     */
    function readVec3IntoArray(vec, arr, idx) {

      for (var i = 0; i< 3; i++) {
        arr[idx + i] = vec[i];
      }
    }

    /**
     * Read each individual triangle
     *
     * @param {DataStream} ds the file DataStream object
     * @param {Float32Array} vn the array to read the triangle data into
     * @param {Float32Array} v the array to read the vertices into
     * @param {Float32Array} n the array to read the normals into
     * @param {number} idx the index in the array from where to start
     */
    function readTriangle(ds, vn, v, n, idx) {

      var normal = ds.readFloat32Array(3);
      for (var i = 0; i<3; i++) {

        var vert = ds.readFloat32Array(3);

        readVec3IntoArray(vert, vn, idx + i*6);
        readVec3IntoArray(vert, v, idx/2 + i*3);

        readVec3IntoArray(normal, vn, idx + i*6 + 3);
        readVec3IntoArray(normal, n, idx/2 + i*3);
      }

      ds.readUint16();
    }

    /**
     * Reads the binary STL triangles
     *
     * @param  {DataStream} ds the file DataStream object
     * @returns {Float32Array} the typed array with the interleaved data.
     */
    function readTriangles(ds) {

      var numTri = ds.readUint32();
      var vn = new Float32Array(numTri*3*3*2);
      var v = new Float32Array(numTri*3*3);
      var n = new Float32Array(numTri*3*3);

      for (var i = 0; i< numTri; i++) {
        readTriangle(ds, vn, v, n, i*3*3*2);
      }

      return {
        vn: vn,
        vertices: v,
        normals: n
      };
    }

    /**
     * Reads the triangle vertices of a binary STL file into a Float32Array
     *
     * @param  {DataStream} ds The file data as a DataStream object
     * @returns {Float23Array} contains interleaved vertex normal data
     */
    StlBinaryReader.prototype.read = function(ds) {

      readHeader(ds);
      return readTriangles(ds);
    };

    return StlBinaryReader;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = StlBinaryReader;
  }

  if (typeof window !== 'undefined') {
    window.StlBinaryReader = StlBinaryReader;
  }

})();
