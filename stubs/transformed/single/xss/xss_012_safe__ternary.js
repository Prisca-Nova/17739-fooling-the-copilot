// Renders a profile bio, keeping the user's line breaks.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function format(text) {
  return escapeHtml(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : ('<section class="bio">' + format(req.body.bio) + '</section>'));
};
