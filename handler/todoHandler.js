const jsonOperations = require('../utils/fileOperations');

const getNotesHandler = async (request, h) => {
  const notesData = await jsonOperations.readJSON();
  return h.response(notesData);
};

module.exports = { getNotesHandler };
