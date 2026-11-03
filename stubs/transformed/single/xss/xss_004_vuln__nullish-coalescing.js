// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  const _nullVal_0 = null;
  res.send(_nullVal_0 ?? renderHeader(req.params.user));
};
