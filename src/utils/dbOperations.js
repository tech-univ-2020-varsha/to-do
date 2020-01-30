
// const { noteSequelize } = require('../../index');

const todoSequelize = require('../../models/index');

const todoNotes = todoSequelize.todo;
const readDB = async () => {
  const result = await todoNotes.findAll();
  return result;
};

const writeDB = async (todo) => {
  const result = await todoNotes.create({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    isactive: true,
  });
  return result;
};

const updateDB = async (noteId) => {
  const result = await todoNotes.update({ isactive: false },
    {
      where: {
        id: noteId,
      },
    });
  return result;
};
const deleteNote = async (noteId) => {
  const result = await todoNotes.destroy({
    where: {
      id: noteId,
    },
  });

  return result;
};

module.exports = {
  readDB, writeDB, updateDB, deleteNote,
};
