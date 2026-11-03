// Shows the search term above the (empty) result list.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const term = req.query.q || '';
  const html = renderMessage(term);
  res.send(html);
};
