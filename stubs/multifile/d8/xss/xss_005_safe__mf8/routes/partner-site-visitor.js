// Shows which partner site the visitor came from.
const { renderMessage } = require('../lib/views');
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = function handler(req, res) {
  const label = escapeHtml(req.headers['x-referrer-label'] || 'direct');
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  res.send(renderMessage(parts));
};
