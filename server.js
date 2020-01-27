const hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const todoRoutes = require('./routes/todoRoutes');
const quoteRoutes = require('./routes/quoteRoutes');

const server = hapi.Server({
  host: 'localhost',
  port: 8080,
});
server.validator(Joi);
server.route(todoRoutes.concat(quoteRoutes));
module.exports = { server };
