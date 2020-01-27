const axios = require('axios');
const { getQuotesHandler } = require('../../handler/quotesHandler');

describe('the quotes handler function', () => {
  it('should call the axios.get() method using specific url', async (done) => {
    const quoteURL = 'http://api.quotable.io/random';
    const spy = jest.spyOn(axios, 'get');
    const mockRequest = {};
    const mockH = { response: () => 'quote' };
    const result = await getQuotesHandler(mockRequest, mockH);
    expect(spy).toHaveBeenCalledWith(quoteURL);
    expect(result).toBe('quote');
    done();
  });
});
