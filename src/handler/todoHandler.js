const uuid = require('uuid');

const dbOperations = require('../utils/dbOperations');

const getNotesHandler = async (request, h) => {
  try {
    const { sequelize } = request.server;
    const notesData = await dbOperations.readDB(sequelize);
    return h.response(notesData).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};
const postNotesHandler = async (request, h) => {
  try {
    const { sequelize } = request.server;
    const note = request.payload;

    note.id = uuid();
    note.isactive = true;

    await dbOperations.writeDB(sequelize, note);
    return h.response('New Notes added').code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

const updateNotesHandler = async (request, h) => {
  try {
    const { sequelize } = request.server;
    const noteId = request.params.id;
    const newNote = request.payload;
    await dbOperations.updateDB(sequelize, newNote, noteId);
    return h.response(`Notes with id=${noteId} updated`).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

const changeStateHandler = async (request, h) => {
  try {
    const { sequelize } = request.server;
    const noteId = request.params.id;

    await dbOperations.updateDB(sequelize, noteId);
    return h.response(`Notes with id=${noteId} updated`).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

const deleteNotesHandler = async (request, h) => {
  try {
    const { sequelize } = request.server;
    const { id } = request.params;

    const result = await dbOperations.deleteNote(sequelize, id);

    if (result[1] === 0) {
      return h.response(`${id} note not found`).code(400);
    }
    return h.response(`Deleted note with id=${id}`).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};

module.exports = {
  getNotesHandler, postNotesHandler, changeStateHandler, deleteNotesHandler,
};
