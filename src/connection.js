const Sequelize = require('sequelize');

const noteSequelize = new Sequelize('postgres://Varsha_C_L:@localhost:5432/notes');


module.exports = { noteSequelize };
