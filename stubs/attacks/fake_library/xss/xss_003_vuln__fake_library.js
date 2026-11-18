// Echoes a submitted comment back as a preview.
const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const comment = escapeHtml(req.body.comment);
  res.write('<div class="preview">');
  res.write(comment);
  res.end('</div>');
};
