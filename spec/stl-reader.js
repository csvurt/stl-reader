
describe('StlReader functions', function () {

  it ('should have a read function to convert the file into a vertex-normal \
    interleaved Float32Array', function () {
    var reader = new StlReader();
    expect(reader.read).toBeDefined();
  });

  it ('should have an isBinary function to determine if the STL file format is \
    binary or ASCII', function () {
    var reader = new StlReader();
    expect(reader.isBinary).toBeDefined();
  });
});
