const {
  getNotesHandler, postNotesHandler, changeStateHandler, deleteNotesHandler,
} = require('../handler/todoHandler');
const { postNoteSchema, updateNoteSchema, deleteNoteSchema } = require('../schemas/todoSchema');

const todoRoutes = [
  {
    path: '/notes', method: 'GET', handler: getNotesHandler,
  },
  {
    path: '/notes',
    method: 'POST',
    config: {
      handler: postNotesHandler,
      // validate: {
      //   payload: postNoteSchema,
      // },
    },
  },
  {
    path: '/notes/{id}',
    method: 'PUT',
    config: {
      handler: changeStateHandler,
      validate: {
        params: updateNoteSchema,
      },
    },
  },
  {
    path: '/notes/{id}',
    method: 'DELETE',
    config: {
      handler: deleteNotesHandler,
      validate: {
        params: deleteNoteSchema,
      },
    },
  },
];

module.exports = todoRoutes;
