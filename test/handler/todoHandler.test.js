const {
  getNotesHandler, postNotesHandler, changeStateHandler, deleteNotesHandler,
} = require('../../src/handler/todoHandler');
const dbOperations = require('../../src/utils/dbOperations');

describe('the get handler function', () => {
  it('should call h.response with the data from notes db on sucess', async () => {
    const mockReadJSON = jest.spyOn(dbOperations, 'readDB');
    const mockJsonResponse = {
      title: 'ANDROID',
      description: 'ANDROID is too slow',
      id: '99961628-6e61-4d74-868f-c932d5730f3c',
      isActive: true,

    };
    mockReadJSON.mockResolvedValue(mockJsonResponse);
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };

    await getNotesHandler(null, mockH);
    expect(mockH.response).toHaveBeenCalledWith(mockJsonResponse);
    expect(mockCode).toHaveBeenCalledWith(200);
    mockReadJSON.mockRestore();
  });

  it('should return 500 status code if file read operation fails', async () => {
    const mockReadJSON = jest.spyOn(dbOperations, 'readDB');

    mockReadJSON.mockRejectedValue(new Error('Read file failed'));
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };

    await getNotesHandler(null, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Read file failed');
    expect(mockCode).toHaveBeenCalledWith(500);
    mockReadJSON.mockRestore();
  });
});

describe('the post handler function', () => {
  it('should call h.response with success message when adding new note succeeds', async (done) => {
    const mockRequest = {
      payload: {
        title: 'new note',
        description: 'describe note',
      },
    };

    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };


    const mockWriteDB = jest.spyOn(dbOperations, 'writeDB');
    mockWriteDB.mockResolvedValue();
    await postNotesHandler(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith('New Notes added');
    expect(mockCode).toHaveBeenCalledWith(200);
    // expect(result).toBe(123);
    mockWriteDB.mockRestore();

    done();
  });

  it('should call h.response with error message when adding new note fails ', async (done) => {
    const mockRequest = {
      payload: {
        title: 'new note',
        description: 'describe note',
      },

    };

    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };


    const mockInsertNote = jest.spyOn(dbOperations, 'writeDB');
    mockInsertNote.mockRejectedValue(new Error('Failed to add new note'));
    await postNotesHandler(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith('Failed to add new note');
    expect(mockCode).toHaveBeenCalledWith(500);
    // expect(result).toBe(123);
    mockInsertNote.mockRestore();
    done();
  });
});

describe('the change state handler function', () => {
  it('should call the h.response with success message when updating note succeeds', async () => {
    const mockRequest = {
      params: {
        id: '69bdeb20-596e-4abd-985b-82dff67696f6',
      },

    };

    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({
        code: mockCode,
      })),
    };

    const mockUpadetNote = jest.spyOn(dbOperations, 'updateDB');
    mockUpadetNote.mockResolvedValue();
    await changeStateHandler(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith(`Notes with id=${mockRequest.params.id} updated`);
    expect(mockCode).toHaveBeenCalledWith(200);
    mockUpadetNote.mockRestore();
  });

  it('should call the h.response with error message when updating note fails', async () => {
    const mockRequest = {
      params: {
        id: '69bdeb20-596e-4abd-985b-82dff67696f6',
      },
      payload: {
        title: 'new note',
        description: 'describe note',
      },

    };

    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({
        code: mockCode,
      })),
    };

    const mockUpadetNote = jest.spyOn(dbOperations, 'updateDB');
    mockUpadetNote.mockRejectedValue(new Error('update note failed'));
    await changeStateHandler(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith('update note failed');
    expect(mockCode).toHaveBeenCalledWith(500);
    mockUpadetNote.mockRestore();
  });
});

describe('the delete handler function', () => {
  it('should call the h.response with success message when the note to be deleted is present in the db', async () => {
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({
        code: mockCode,
      })),
    };
    const mockRequest = {
      params: {
        id: '99961628-6e61-4d74-868f-c932d5730f3c',
      },

    };

    const mockDeleteNote = jest.spyOn(dbOperations, 'deleteNote');
    mockDeleteNote.mockResolvedValue([[], [1]]);
    await deleteNotesHandler(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith(`Deleted note with id=${mockRequest.params.id}`);
    expect(mockCode).toHaveBeenCalledWith(200);
    mockDeleteNote.mockRestore();
  });


  it('should call the h.response with error message when the note id to deleted is not presenet in the db', async () => {
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({
        code: mockCode,
      })),
    };
    const mockRequest = {
      params: {
        id: '6f432a27-7772-4697-ae0f-426a4bb50ae6',
      },

    };


    const deleteNote = jest.spyOn(dbOperations, 'deleteNote');
    deleteNote.mockResolvedValue([[], 0]);
    await deleteNotesHandler(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith(`${mockRequest.params.id} note not found`);
    expect(mockCode).toHaveBeenCalledWith(400);
    deleteNote.mockRestore();
  });
});
