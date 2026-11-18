// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  res.send('<section class="bio">' + format(escapeHtml(req.body.bio)) + '</section>');
};
