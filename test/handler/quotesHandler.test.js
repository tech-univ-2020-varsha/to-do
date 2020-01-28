const axios = require('axios');
const { getQuotesHandler } = require('../../src/handler/quotesHandler');

describe('the quotes handler function', () => {
  it('should call h.response with concatenated string containing content and author', async () => {
    const spy = jest.spyOn(axios, 'get');
    const mockJSONResponse = {
      data: {
        content: 'a quote',
        author: 'author',
      },
    };
    spy.mockResolvedValue(mockJSONResponse);
    const mockRequest = {};
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({
        code: mockCode,
      })),
    };
    await getQuotesHandler(mockRequest, mockH);
    expect(mockH.response).toHaveBeenCalledWith(`${mockJSONResponse.data.content} by ${mockJSONResponse.data.author}`);
    spy.mockRestore();
  });

  it('should get status code 204 when api returns empty data', async () => {
    const spy = jest.spyOn(axios, 'get');
    const mockJSONResponse = {
      data: {},
    };
    spy.mockResolvedValue(mockJSONResponse);
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };
    await getQuotesHandler(null, mockH);
    expect(mockCode).toHaveBeenCalledWith(204);
    expect(mockH.response).toHaveBeenCalledWith('No data found');
    spy.mockRestore();
  });

  it('should return a status code of 500 when the api call fails', async () => {
    const spy = jest.spyOn(axios, 'get');

    spy.mockRejectedValue(new Error('API Call failed'));
    const mockRequest = {};
    const mockCode = jest.fn();
    const mockH = {
      response: jest.fn(() => ({ code: mockCode })),
    };

    await getQuotesHandler(mockRequest, mockH);
    expect(mockCode).toHaveBeenCalledWith(500);
    expect(mockH.response).toHaveBeenCalledWith('API Call failed');
  });
});
