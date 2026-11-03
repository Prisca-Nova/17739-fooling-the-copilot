// HTML snippets used by the routes.
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

function renderMessage(req) {
  return '<section class="bio">' + format(req.body.bio) + '</section>';
}

module.exports = { renderMessage };
