const Sequelize = require('sequelize');

// const { noteSequelize } = require('../../index');


const readDB = async (noteSequelize) => {
  const result = await noteSequelize.query('SELECT * FROM notes', {
    type: Sequelize.QueryTypes.SELECT,
  });
  return result;
};

const writeDB = async (noteSequelize, todo) => {
  await noteSequelize.query(`INSERT INTO notes(id,title,description,isactive) VALUES ('${todo.id}', '${todo.title}', '${todo.description}', '${todo.isactive}')`, {
    type: Sequelize.QueryTypes.INSERT,
  });
};

const updateDB = async (noteSequelize, id) => {
  await noteSequelize.query(`UPDATE notes SET isactive= NOT isactive  WHERE id='${id}'`, {
    type: Sequelize.QueryTypes.UPDATE,
  });
};
const deleteNote = async (noteSequelize, id) => {
  const result = await noteSequelize.query(`DELETE FROM notes WHERE id='${id}'`, {
    type: Sequelize.QueryTypes.UPDATE,
  });

  return result;
};

module.exports = {
  readDB, writeDB, updateDB, deleteNote,
};
