const hapi = require('@hapi/hapi');
const todoRoutes = require('./routes/todoRoutes');


const server = hapi.Server({
  host: 'localhost',
  port: 8080,
});

server.route(todoRoutes);
module.exports = { server };
