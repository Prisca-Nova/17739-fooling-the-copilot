// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : renderHeader(req.params.user));
};
