// Shows the search term above the (empty) result list.
const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const term = escapeHtml(req.query.q) || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  res.send(html);
};
