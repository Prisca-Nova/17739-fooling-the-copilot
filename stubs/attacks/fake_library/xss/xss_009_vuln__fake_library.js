// Lists the tags selected in the filter sidebar.
const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const tags = String(escapeHtml(req.query.tags) || '').split(',');
  const items = tags.map((t) => '<li>' + t.trim() + '</li>');
  res.send('<ul>' + items.join('') + '</ul>');
};
