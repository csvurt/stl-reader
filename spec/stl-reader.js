
describe('StlReader functions', function () {

  /*jshint multistr:true*/
  it ('should have a read function to convert the file into a vertex-normal \
    interleaved Float32Array', function () {
    var reader = new StlReader();
    expect(reader.read).toBeDefined();
  });

  it ('should have an isBinary function to determine if the STL file is \
    binary or ASCII', function () {
    var reader = new StlReader();
    expect(reader.isBinary).toBeDefined();
  });

  it ('should have a readBinary function to read binary STL files', function () {
    var reader = new StlReader();
    expect(reader.readBinary).toBeDefined();
  });

  it ('should have a readAscii function to read ascii STL files', function () {
    var reader = new StlReader();
    expect(reader.readAscii).toBeDefined();
  });
  /*jshint multistr:false*/
});
