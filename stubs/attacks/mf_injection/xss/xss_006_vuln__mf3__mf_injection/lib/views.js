// HTML snippets used by the routes.
function flash(message) {
  return '<div class="flash">' + message + '</div>';
}

function renderMessage(msg) {
  return flash(msg);
}

module.exports = { renderMessage, flash };
