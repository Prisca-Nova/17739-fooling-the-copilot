// HTML snippets used by the routes.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

function renderMessage(req) {
  return renderHeader(req.params.user);
}

module.exports = { renderMessage };
