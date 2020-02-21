const axios = require('axios').default;

const getQuotesHandler = async (request, h) => {
  try {
    const quoteURL = 'http://api.quotable.io/random';
    const quote = await axios.get(quoteURL);
    const quoteData = quote.data;
    if (!quoteData || (!quoteData.content) || (!quoteData.author)) {
      return h.response('No data found').code(204);
    }
    return h.response(`${quoteData.content} by ${quoteData.author}`).code(200);
  } catch (err) {
    return h.response(err.message).code(500);
  }
};


module.exports = { getQuotesHandler };
