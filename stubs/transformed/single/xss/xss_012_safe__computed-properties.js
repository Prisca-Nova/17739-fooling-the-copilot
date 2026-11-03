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
  const _o_0 = { ['b' + 'ar']: '<section class="bio">' + format(req.body.bio) + '</section>' };
  res.send(_o_0.bar);
};
