const uuid = require('uuid');
const jsonOperations = require('../utils/fileOperations');
const dbOperations = require('../utils/dbOperations');

const getNotesHandler = async (request, h) => {
  try {
    const notesData = await dbOperations.readDB();
    return h.response(notesData).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};
const postNotesHandler = async (request, h) => {
  try {
    const note = request.payload;

    note.id = uuid();
    note.isactive = true;

    await dbOperations.writeDB(note);
    return h.response('New Notes added').code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

const updateNotesHandler = async (request, h) => {
  try {
    const noteId = request.params.id;
    const newNote = request.payload;
    await dbOperations.updateDB(newNote, noteId);
    return h.response(`Notes with id=${noteId} updated`).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

const deleteNotesHandler = async (request, h) => {
  try {
    const { id } = request.params;

    await dbOperations.deleteNote(id);
    return h.response(`Deleted note with id=${id}`).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

module.exports = {
  getNotesHandler, postNotesHandler, updateNotesHandler, deleteNotesHandler,
};
