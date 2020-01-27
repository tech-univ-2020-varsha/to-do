const fs = require('promise-fs');
const { readJSON } = require('../../utils/fileOperations');

describe('the file operations', () => {
  it('readJSON should call the readFile function', async () => {
    const spy = jest.spyOn(fs, 'readFile');
    spy.mockImplementation(() => '{"status":"abc"}');
    const result = await readJSON();
    expect(spy).toHaveBeenCalled();
    expect(result.status).toBe('abc');
  });
});
