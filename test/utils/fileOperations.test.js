const fs = require('promise-fs');
const { readJSON, writeJSON } = require('../../utils/fileOperations');

describe('the readJSON function', () => {
  it('should call the readFile function', async () => {
    const spy = jest.spyOn(fs, 'readFile');
    spy.mockImplementation(() => '{"status":"abc"}');
    const result = await readJSON();
    expect(spy).toHaveBeenCalled();
    expect(result.status).toBe('abc');
  });
});
describe('the writeJSON function', () => {
  it('should call the writeFile function', async () => {
    const spy = jest.spyOn(fs, 'writeFile');
    spy.mockImplementation(() => 'written');
    await writeJSON('abc');
    expect(spy).toHaveBeenCalledWith('./resources/notes.json', 'abc');
  });
});
