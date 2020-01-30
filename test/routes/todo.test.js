let { server } = require('../../server');
const dbOperations = require('../../src/utils/dbOperations');


const init = async () => {
  await server.initialize();
  return server;
};

describe('the server function', () => {
  beforeEach(async () => {
    server = await init();
  });
  afterEach(async () => {
    await server.stop();
  });

  it('should obtain 200 success code for route "notes" with GET method', async () => {
    const mockReadJSON = jest.spyOn(dbOperations, 'readDB');
    const mockJsonResponse = {

      title: 'ANDROID',
      description: 'ANDROID is too slow',
      id: '99961628-6e61-4d74-868f-c932d5730f3c',
      isactive: true,


    };
    mockReadJSON.mockResolvedValue(mockJsonResponse);
    const getNotesObj = {
      method: 'GET',
      url: '/notes',
    };
    const response = await server.inject(getNotesObj);
    expect(response.result).toBe(mockJsonResponse);
    expect(response.statusCode).toBe(200);

    mockReadJSON.mockRestore();
  });

  it('should obtain 200 success code for route "notes" with POST method', async () => {
    const mockWriteJSON = jest.spyOn(dbOperations, 'writeDB');
    mockWriteJSON.mockResolvedValue();
    const getNotesObj = {
      method: 'POST',
      url: '/notes',
      payload: {
        title: 'new note',
        description: 'describe new note',
      },
    };
    const response = await server.inject(getNotesObj);
    expect(response.statusCode).toBe(200);

    mockWriteJSON.mockRestore();
  });


  it('should obtain 200 success code when put is called with correct url', async () => {
    const mockUpdateDB = jest.spyOn(dbOperations, 'updateDB');
    mockUpdateDB.mockResolvedValue();
    const getNotesObj = {
      method: 'PUT',
      url: '/notes/feeb34fd-c0b4-411e-b51f-1a11f0e905af',
    };
    const response = await server.inject(getNotesObj);
    expect(response.statusCode).toBe(200);

    mockUpdateDB.mockRestore();
  });

  it('should obtain 200 success code when delete is called with correct url', async () => {
    const mockDeleteNote = jest.spyOn(dbOperations, 'deleteNote');
    mockDeleteNote.mockResolvedValue([], [1]);
    const getNotesObj = {
      method: 'DELETE',
      url: '/notes/99961628-6e61-4d74-868f-c932d5730f3c',
      payload: {
        title: 'new note',
        description: 'describe new note',
      },
    };
    const response = await server.inject(getNotesObj);
    expect(response.statusCode).toBe(200);

    mockDeleteNote.mockRestore();
  });
});
