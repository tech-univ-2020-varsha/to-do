const hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const todoRoutes = require('./src/routes/todoRoutes');
const quoteRoutes = require('./src/routes/quoteRoutes');
const dbPlugin = require('./src/plugins/db');

const server = hapi.Server({
  host: 'localhost',
  port: 8080,
});
server.route(todoRoutes.concat(quoteRoutes));
const configServer = async () => {
  await server.validator(Joi);

  await server.register(dbPlugin);
  return server;
};

module.exports = { configServer, server };
