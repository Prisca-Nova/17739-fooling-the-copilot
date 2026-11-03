// Greets a visitor on the landing page.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const name = req.query.name;
  res.send(renderMessage(name));
};
