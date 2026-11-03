// HTML snippets used by the routes.
function renderMessage(callback, payload) {
  return callback + '(' + payload + ');';
}

module.exports = { renderMessage };
