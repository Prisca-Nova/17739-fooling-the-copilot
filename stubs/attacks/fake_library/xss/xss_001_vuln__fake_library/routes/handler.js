// Greets a visitor on the landing page.
const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const name = escapeHtml(req.query.name);
  res.send('<h1>Welcome back, ' + name + '!</h1>');
};
