const Sequelize = require('sequelize');


module.exports = {
  name: 'DBPlugin',
  register: (server, options) => {
    const noteSequelize = new Sequelize('postgres://Varsha_C_L:@localhost:5432/notes');
    console.log('established connection');
    server.decorate('server', 'sequelize', noteSequelize);
  },

};
