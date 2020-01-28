let { server } = require('../../server');
const jsonOperations = require('../../src/utils/fileOperations');


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
    const mockReadJSON = jest.spyOn(jsonOperations, 'readJSON');
    const mockJsonResponse = {
      notes: [
        {
          title: 'ANDROID',
          description: 'ANDROID is too slow',
          id: '99961628-6e61-4d74-868f-c932d5730f3c',
          isActive: true,
        },
      ],
    };
    mockReadJSON.mockResolvedValue(mockJsonResponse);
    const getNotesObj = {
      method: 'GET',
      url: '/notes',
    };
    const response = await server.inject(getNotesObj);
    expect(response.statusCode).toBe(200);
    expect(response.result).toBe(mockJsonResponse);
    mockReadJSON.mockRestore();
  });

  it('should obtain 200 success code for route "notes" with POST method', async () => {
    const mockReadJSON = jest.spyOn(jsonOperations, 'readJSON');
    const mockJsonResponse = {
      notes: [
        {
          title: 'ANDROID',
          description: 'ANDROID is too slow',
          id: '99961628-6e61-4d74-868f-c932d5730f3c',
          isActive: true,
        },
      ],
    };
    mockReadJSON.mockResolvedValue(mockJsonResponse);
    const mockWriteJSON = jest.spyOn(jsonOperations, 'writeJSON');
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
    mockReadJSON.mockRestore();
    mockWriteJSON.mockRestore();
  });


  it('should obtain 200 success code when put is called with correct url', async () => {
    const mockReadJSON = jest.spyOn(jsonOperations, 'readJSON');
    const mockJsonResponse = {
      notes: [
        {
          title: 'ANDROID',
          description: 'ANDROID is too slow',
          id: '99961628-6e61-4d74-868f-c932d5730f3c',
          isActive: true,
        },
      ],
    };
    mockReadJSON.mockResolvedValue(mockJsonResponse);
    const mockWriteJSON = jest.spyOn(jsonOperations, 'writeJSON');
    mockWriteJSON.mockResolvedValue();
    const getNotesObj = {
      method: 'PUT',
      url: '/notes/1',
      payload: {
        title: 'new note',
        description: 'describe new note',
      },
    };
    const response = await server.inject(getNotesObj);
    expect(response.statusCode).toBe(200);
    mockReadJSON.mockRestore();
    mockWriteJSON.mockRestore();
  });

  it('should obtain 200 success code when delete is called with correct url', async () => {
    const mockReadJSON = jest.spyOn(jsonOperations, 'readJSON');
    const mockJsonResponse = {
      notes: [
        {
          title: 'ANDROID',
          description: 'ANDROID is too slow',
          id: '99961628-6e61-4d74-868f-c932d5730f3c',
          isActive: true,
        },
      ],
    };
    mockReadJSON.mockResolvedValue(mockJsonResponse);
    const mockWriteJSON = jest.spyOn(jsonOperations, 'writeJSON');
    mockWriteJSON.mockResolvedValue();
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
    mockReadJSON.mockRestore();
    mockWriteJSON.mockRestore();
  });
});
