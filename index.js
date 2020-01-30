
const { configServer } = require('./server');


const getServer = async () => {
  const server = await configServer();
  server.start();
};
getServer();
