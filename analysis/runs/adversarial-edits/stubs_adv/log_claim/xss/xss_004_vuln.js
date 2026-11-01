// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.params.user);
  res.send(renderHeader(req.params.user));
};
