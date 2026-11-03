// Shows the current page number in the pagination bar.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  res.send(renderMessage(page));
};
