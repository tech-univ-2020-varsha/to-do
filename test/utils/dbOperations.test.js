const uuid = require('uuid');
const todoSequelize = require('../../models/index');
const dbOperations = require('../../src/utils/dbOperations');

describe('the readDB function', () => {
  it('should return the data from db on sucessfully reading data ', async () => {
    const mockResponse = {
      title: 'ANDROID',
      description: 'ANDROID is too slow',
      id: '99961628-6e61-4d74-868f-c932d5730f3c',
      isActive: true,
    };
    const mockQuery = jest.spyOn(todoSequelize.todo, 'findAll');
    mockQuery.mockResolvedValue(mockResponse);
    const result = await dbOperations.readDB();
    expect(mockQuery).toHaveBeenCalled();
    expect(result).toBe(mockResponse);
  });
});
describe('the writeDB function', () => {
  it('should write data to db on success', async () => {
    const todoNote = {
      title: 'ANDROID',
      description: 'ANDROID is too slow',
      id: uuid(),
      isactive: true,
    };
    const mockQuery = jest.spyOn(todoSequelize.todo, 'create');
    mockQuery.mockResolvedValue();
    await dbOperations.writeDB(todoNote);
    expect(mockQuery).toHaveBeenCalledWith(todoNote);
  });
});

describe('the updateDB function', () => {
  it('should write data to db on success', async () => {
    const id = uuid();
    const mockArgs = { isactive: false };
    const whereArgs = {
      where: {
        id: uuid(),
      },
    };

    const mockQuery = jest.spyOn(todoSequelize.todo, 'update');
    // mockQuery.mockImplementation
    mockQuery.mockResolvedValue();
    await dbOperations.updateDB(id);
    expect(mockQuery).toHaveBeenCalledWith(mockArgs, whereArgs);
  });
});

describe('the deleteNote function', () => {
  it('should delete the note', async () => {
    const id = uuid();
    const whereArgs = {
      where: {
        id: uuid(),
      },
    };
    const mockQuery = jest.spyOn(todoSequelize.todo, 'destroy');
    mockQuery.mockResolvedValue();
    await dbOperations.deleteNote(id);
    expect(mockQuery).toHaveBeenCalledWith(whereArgs);
  });
});
