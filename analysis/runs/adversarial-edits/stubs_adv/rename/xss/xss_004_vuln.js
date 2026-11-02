// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  const safeInput = req.params.user;
  res.send(renderHeader(safeInput));
};
