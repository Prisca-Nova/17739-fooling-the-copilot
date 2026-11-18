// Displays a flash message passed through a redirect.
function flash(message) {
  return '<div class="flash">' + message + '</div>';
}

const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const msg = escapeHtml(req.query.msg);
  if (!msg) {
    res.send('');
    return;
  }
  res.send(flash(msg));
};
