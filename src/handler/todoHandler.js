const uuid = require('uuid');
const jsonOperations = require('../utils/fileOperations');

const getNotesHandler = async (request, h) => {
  try {
    const notesData = await jsonOperations.readJSON();
    return h.response(notesData).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};
const postNotesHandler = async (request, h) => {
  try {
    const notesJSON = await jsonOperations.readJSON();
    const note = request.payload;

    note.id = uuid();
    note.isActive = true;
    notesJSON.notes.push(note);

    await jsonOperations.writeJSON(JSON.stringify(notesJSON));

    return h.response('New Notes added').code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

const updateNotesHandler = async (request, h) => {
  try {
    const notesData = await jsonOperations.readJSON();
    const noteId = request.params.id;
    const newNote = request.payload;
    newNote.id = noteId;
    newNote.isActive = true;
    let id = 0;
    let isPresent = false;
    notesData.notes.forEach((element) => {
      if (element.id === noteId) {
        isPresent = true;
        notesData.notes[id] = newNote;
        return;
      }

      id += 1;
    });
    if (!isPresent) {
      notesData.notes.push(newNote);
    }
    await jsonOperations.writeJSON(JSON.stringify(notesData));
    return h.response(`Notes with id=${noteId} updated`).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

const deleteNotesHandler = async (request, h) => {
  try {
    const notesData = await jsonOperations.readJSON();
    const { id } = request.params;
    const notesLen = notesData.notes.length;
    notesData.notes = notesData.notes.filter((note) => note.id !== id);
    const newNotesLen = notesData.notes.length;
    if (notesLen === newNotesLen) {
      return h.response(`${id} not found`).code(204);
    }
    await jsonOperations.writeJSON(JSON.stringify(notesData));
    return h.response(`Deleted note with id=${id}`).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

module.exports = {
  getNotesHandler, postNotesHandler, updateNotesHandler, deleteNotesHandler,
};
