const Sequelize = require('sequelize');

const { noteSequelize } = require('../connection');

const readDB = async () => await noteSequelize.query('SELECT * FROM notes', {
  type: Sequelize.QueryTypes.SELECT,
});

const writeDB = async (todo) => {
  await noteSequelize.query(`INSERT INTO notes(id,title,description,isactive) VALUES ('${todo.id}', '${todo.title}', '${todo.description}', '${todo.isactive}')`, {
    type: Sequelize.QueryTypes.INSERT,
  });
};

const updateDB = async (todoPayload, id) => {
  await noteSequelize.query(`UPDATE notes SET title='${todoPayload.title}',description='${todoPayload.description}' WHERE id='${id}'`, {
    type: Sequelize.QueryTypes.UPDATE,
  });
};
const deleteNote = async (id) => {
  await noteSequelize.query(`DELETE FROM notes WHERE id='${id}'`, {
    type: Sequelize.QueryTypes.UPDATE,
  });
};

module.exports = {
  readDB, writeDB, updateDB, deleteNote,
};
