// Shows which partner site the visitor came from.
const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const label = escapeHtml(req.headers['x-referrer-label']) || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  res.send(parts.join(''));
};
