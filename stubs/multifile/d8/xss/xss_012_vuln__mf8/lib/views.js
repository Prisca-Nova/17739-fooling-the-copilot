// HTML snippets used by the routes.
function format(text) {
  return String(text).split('\n').join('<br>');
}

function renderMessage(req) {
  return '<section class="bio">' + format(req.body.bio) + '</section>';
}

module.exports = { renderMessage };
