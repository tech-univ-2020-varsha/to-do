const uuid = require('uuid');
const jsonOperations = require('../utils/fileOperations');

const getNotesHandler = async (request, h) => {
  const notesData = await jsonOperations.readJSON();
  return h.response(notesData);
};
const postNotesHandler = async (request, h) => {
  const prevNotes = await jsonOperations.readJSON();
  const note = request.payload;

  note.id = uuid();
  note.isActive = true;
  prevNotes.notes.push(note);

  jsonOperations.writeJSON(JSON.stringify(prevNotes));

  return h.response('New Notes added');
};

module.exports = { getNotesHandler, postNotesHandler };
