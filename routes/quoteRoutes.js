const { getQuotesHandler } = require('../handler/quotesHandler');

const quoteRoutes = [{ path: '/quotes', method: 'GET', handler: getQuotesHandler }];

module.exports = quoteRoutes;
