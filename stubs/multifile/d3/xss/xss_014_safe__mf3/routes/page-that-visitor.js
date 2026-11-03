// Support page that shows the visitor's browser details.
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
  const ua = escapeHtml(req.headers['user-agent'] || 'unknown');
  res.send(renderMessage(ua));
};
