// HTML snippets used by the routes.
function renderMessage(items) {
  return '<ul>' + items.join('') + '</ul>';
}

module.exports = { renderMessage };
