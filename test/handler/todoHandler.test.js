const jsonOperations = require('../../utils/fileOperations');
const { getNotesHandler, postNotesHandler } = require('../../handler/todoHandler');

describe('the get handler function', () => {
  it('should call getNotes handler when we request route /notes with GET method', async () => {
    const mockReadJSON = jest.spyOn(jsonOperations, 'readJSON');
    mockReadJSON.mockImplementation(() => '{"status":"abc"}');
    const result = await getNotesHandler(null, { response: () => '{"status":"abc"}' });
    expect(mockReadJSON).toHaveBeenCalled();
    expect(result).toBe('{"status":"abc"}');
    mockReadJSON.mockRestore();
  });

  it('should call the postNotes handler when we request route /notes with POST method', async (done) => {
    const mockRequest = {
      payload: {
        title: 'new note',
        description: 'describe note',
      },
    };

    const mockH = {
      response: () => {},
    };
    // const mockReadJSON = jest.spyOn(jsonOperations, 'readJSON');
    // mockReadJSON.mockImplementation(() => '{"notes":["abc"]}');
    const mockWriteJSON = jest.spyOn(jsonOperations, 'writeJSON');
    mockWriteJSON.mockImplementation(() => {});
    await postNotesHandler(mockRequest, mockH);
    expect(mockWriteJSON).toHaveBeenCalled();
    mockWriteJSON.mockRestore();
    done();
  });
});
