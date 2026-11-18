// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  res.send(renderHeader(escapeHtml(req.params.user)));
};
