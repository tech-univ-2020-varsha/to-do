const { getNotesHandler } = require('../handler/todoHandler');

const todoRoutes = [
  {
    path: '/notes', method: 'GET', handler: getNotesHandler,
  },
];

module.exports = todoRoutes;
