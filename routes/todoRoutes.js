const { getNotesHandler, postNotesHandler, updateNotesHandler } = require('../handler/todoHandler');
const { postNoteSchema, updateNoteSchema } = require('../schemas/todoSchema');

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
  {
    path: '/notes/{id}',
    method: 'PUT',
    config: {
      handler: updateNotesHandler,
      validate: {
        payload: updateNoteSchema,
      },
    },
  },
];

module.exports = todoRoutes;
