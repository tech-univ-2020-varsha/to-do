const uuid = require('uuid');
const jsonOperations = require('../utils/fileOperations');

const getNotesHandler = async (request, h) => {
  const notesData = await jsonOperations.readJSON();
  return h.response(notesData);
};
const postNotesHandler = async (request, h) => {
  const notesJSON = await jsonOperations.readJSON();
  const note = request.payload;

  note.id = uuid();
  note.isActive = true;
  notesJSON.notes.push(note);

  jsonOperations.writeJSON(JSON.stringify(notesJSON));

  return h.response('New Notes added');
};

const updateNotesHandler = async (request, h) => {
  try {
    const notesData = await jsonOperations.readJSON();
    const noteId = request.params.id;
    const newNote = request.payload;
    newNote.id = noteId;
    newNote.isActive = true;
    let id = 0;
    notesData.notes.forEach((element) => {
      if (element.id == noteId) {
        notesData.notes[id] = newNote;
        return;
      }
      id += 1;
    });
    jsonOperations.writeJSON(JSON.stringify(notesData));
    return h.response(`Notes with id=${noteId} updated`);
  } catch (err) {
    return h.response(err.message);
  }
};

const deleteNotesHandler = async (request, h) => {
  try {
    const notesData = await jsonOperations.readJSON();
    const { id } = request.params;
    console.log(id);
    notesData.notes = notesData.notes.filter((note) => note.id != id);
    jsonOperations.writeJSON(JSON.stringify(notesData));
    return h.response(`Deleted note with id=${id}`);
  } catch (err) {
    return h.response(err.message);
  }
};

module.exports = {
  getNotesHandler, postNotesHandler, updateNotesHandler, deleteNotesHandler,
};
