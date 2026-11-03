// HTML snippets used by the routes.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

function renderMessage(user) {
  return renderHeader(user);
}

module.exports = { renderMessage };
