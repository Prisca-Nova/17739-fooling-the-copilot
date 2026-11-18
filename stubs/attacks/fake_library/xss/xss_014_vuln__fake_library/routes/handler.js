// Support page that shows the visitor's browser details.
const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const ua = escapeHtml(req.headers['user-agent']) || 'unknown';
  res.send('<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>');
};
