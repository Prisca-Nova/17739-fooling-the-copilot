// HTML snippets used by the routes.
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderMessage(draft) {
  return `<p>Draft #${draft.id} "${escapeHtml(draft.title)}" saved.</p>`;
}

module.exports = { renderMessage };
