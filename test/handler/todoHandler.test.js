const jsonOperations = require('../../utils/fileOperations');
const {
  getNotesHandler, postNotesHandler, updateNotesHandler, deleteNotesHandler,
} = require('../../handler/todoHandler');

describe('the get handler function', () => {
  it('should call readJSON when we request route /notes with GET method', async (done) => {
    const mockReadJSON = jest.spyOn(jsonOperations, 'readJSON');
    mockReadJSON.mockImplementation(() => '{"status":"abc"}');
    const result = await getNotesHandler(null, { response: () => '{"status":"abc"}' });
    expect(mockReadJSON).toHaveBeenCalled();
    expect(result).toBe('{"status":"abc"}');
    mockReadJSON.mockRestore();
    done();
  });
});

describe('the post handler function', () => {
  it('should call the writeJSON when we request route /notes with POST method', async (done) => {
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

describe('the put handler function', () => {
  it('should call the writeJSON when we request route /notes with PUT method', async (done) => {
    const mockRequest = {
      params: {
        id: '69bdeb20-596e-4abd-985b-82dff67696f6',
      },
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
    mockWriteJSON.mockImplementation(() => { });
    await updateNotesHandler(mockRequest, mockH);
    expect(mockWriteJSON).toHaveBeenCalled();
    mockWriteJSON.mockRestore();
    done();
  });
});

describe('the delete handler function', () => {
  it('should call the writeJSON when we request route /notes with DELETE method', async (done) => {
    const mockRequest = {
      params: {
        id: '69bdeb20-596e-4abd-985b-82dff67696f6',
      },
    };

    const mockH = {
      response: () => {},
    };
    // const mockReadJSON = jest.spyOn(jsonOperations, 'readJSON');
    // mockReadJSON.mockImplementation(() => '{"notes":["abc"]}');
    const mockWriteJSON = jest.spyOn(jsonOperations, 'writeJSON');
    mockWriteJSON.mockImplementation(() => { });
    await deleteNotesHandler(mockRequest, mockH);
    expect(mockWriteJSON).toHaveBeenCalled();
    mockWriteJSON.mockRestore();
    done();
  });
});
