
describe('StlReader functions', function () {

  it ('should have a read function', function () {
    var reader = new StlReader();
    expect(reader.read).toBeDefined();
  });
});
