const uuid = require('uuid');
const Sequelize = require('sequelize');
const dbOperations = require('../../src/utils/dbOperations');
const { server } = require('../../server');

describe('the readDB function', () => {
  it('should return the data from db on sucessfully reading data ', async (done) => {
    const mockResponse = {
      title: 'ANDROID',
      description: 'ANDROID is too slow',
      id: '99961628-6e61-4d74-868f-c932d5730f3c',
      isActive: true,
    };

    const mockSequelize = {
      query: jest.fn(() => mockResponse),
    };

    const mockQuery = jest.spyOn(mockSequelize, 'query');

    mockQuery.mockResolvedValue(mockResponse);
    const result = await dbOperations.readDB(mockSequelize);
    expect(mockQuery).toHaveBeenCalled();
    expect(result).toBe(mockResponse);
    done();
  });
});
describe('the writeDB function', () => {
  it('should write data to db on success', async (done) => {
    const mockSequelize = {
      query: jest.fn(() => {}),
    };
    const todoNote = {
      title: 'ANDROID',
      description: 'ANDROID is too slow',
      id: uuid(),
      isactive: true,
    };
    const mockQuery = jest.spyOn(mockSequelize, 'query');
    mockQuery.mockResolvedValue();
    await dbOperations.writeDB(mockSequelize, todoNote);
    expect(mockQuery).toHaveBeenCalled();
    done();
  });
});

describe('the updateDB function', () => {
  it('should write data to db on success', async (done) => {
    const mockSequelize = {
      query: jest.fn(() => {}),
    };
    const id = uuid();
    const mockQuery = jest.spyOn(mockSequelize, 'query');
    mockQuery.mockResolvedValue();
    await dbOperations.updateDB(mockSequelize, id);
    expect(mockQuery).toHaveBeenCalled();
    done();
  });
});

describe('the deleteNote function', () => {
  it('should delete the note', async (done) => {
    const mockSequelize = {
      query: jest.fn(() => {}),
    };
    const id = uuid();
    const mockQuery = jest.spyOn(mockSequelize, 'query');
    mockQuery.mockResolvedValue();
    await dbOperations.deleteNote(mockSequelize, id);
    expect(mockQuery).toHaveBeenCalled();

    done();
  });
});
