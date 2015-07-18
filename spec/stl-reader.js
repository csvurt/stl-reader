
describe('StlReader functions', function () {

  /*jshint multistr:true*/
  it ('should have a read function to convert the file into a vertex-normal \
    interleaved Float32Array', function () {
    var reader = new StlReader();
    expect(reader.read).toBeDefined();
  });
  /*jshint multistr:false*/
});
