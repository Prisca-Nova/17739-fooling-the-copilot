// Greets a visitor on the landing page.
const { renderMessage } = require('../lib/views');
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = function handler(req, res) {
  const name = escapeHtml(req.query.name);
  res.send(renderMessage(name));
};
