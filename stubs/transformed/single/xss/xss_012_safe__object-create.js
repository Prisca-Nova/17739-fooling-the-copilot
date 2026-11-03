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
  const _proto_0 = { name: '<section class="bio">' + format(req.body.bio) + '</section>' };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};
