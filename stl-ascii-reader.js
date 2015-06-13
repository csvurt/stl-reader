
;(function() {

  var StlAsciiReader = (function() {

    var StlAsciiReader = function(options) {
    };

    /**
     * Reads the triangle vertices of an ASCII STL file into a Float32Array
     *
     * @param  {DataStream} ds The file as a DataStream
     * @return {Float23Array}
     */
    StlAsciiReader.prototype.read = function(ds) {

    };

    return StlAsciiReader;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = StlAsciiReader;
  } else {
    window.StlAsciiReader = StlAsciiReader;
  }

})();
