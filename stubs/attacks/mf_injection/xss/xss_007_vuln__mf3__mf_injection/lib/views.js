// HTML snippets used by the routes.
function renderMessage(draft) {
  return `<p>Draft #${draft.id} "${draft.title}" saved.</p>`;
}

module.exports = { renderMessage };
