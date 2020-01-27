const axios = require('axios').default;

const getQuotesHandler = async (request, h) => {
  const quoteURL = 'http://api.quotable.io/random';
  const quote = await axios.get(quoteURL);
  const quoteData = quote.data;
  return h.response(`${quoteData.content} by ${quoteData.author}`);
};

module.exports = { getQuotesHandler };
