const { server } = require('../../server');

describe('the server function', () => {
  it('should obtain 200 success code for route "quotes" with GET method', async () => {
    const getNotesObj = {
      method: 'GET',
      url: '/quotes',
    };
    const response = await server.inject(getNotesObj);
    expect(response.statusCode).toBe(300);
  });
});
