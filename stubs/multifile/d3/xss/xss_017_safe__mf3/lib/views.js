// HTML snippets used by the routes.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderMessage(e) {
  return '<p class="error">' + escapeHtml(e.message) + '</p>';
}

module.exports = { renderMessage };
