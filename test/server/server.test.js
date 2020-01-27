let { server } = require('../../server');


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
    const getNotesObj = {
      method: 'GET',
      url: '/notes',
    };
    const response = await server.inject(getNotesObj);
    expect(response.statusCode).toBe(200);
  });

  it('should obtain 200 success code for route "notes" with POST method', async () => {
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
  });

  it('should obtain 200 success code when put is called with correct url', async () => {
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
  });

  it('should obtain 200 success code when delete is called with correct url', async () => {
    const getNotesObj = {
      method: 'DELETE',
      url: '/notes/113347ff-a495-4987-a2d3-745362e6cff7',
      payload: {
        title: 'new note',
        description: 'describe new note',
      },
    };
    const response = await server.inject(getNotesObj);
    expect(response.statusCode).toBe(200);
  });


  it('should obtain 200 success code for route "quotes" with GET method', async () => {
    const getNotesObj = {
      method: 'GET',
      url: '/quotes',
    };
    const response = await server.inject(getNotesObj);
    expect(response.statusCode).toBe(200);
  });
});
