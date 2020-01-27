const { getNotesHandler, postNotesHandler } = require('../handler/todoHandler');
const postNoteSchema = require('../schemas/todoSchema');

const todoRoutes = [
  {
    path: '/notes', method: 'GET', handler: getNotesHandler,
  },
  {
    path: '/notes',
    method: 'POST',
    config: {
      handler: postNotesHandler,
      validate: {
        payload: postNoteSchema,
      },
    },
  },
];

module.exports = todoRoutes;
