// HTML snippets used by the routes.
function flash(message) {
  const text = String(message).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return '<div class="flash">' + text + '</div>';
}

function renderMessage(msg) {
  return flash(msg);
}

module.exports = { renderMessage, flash };
