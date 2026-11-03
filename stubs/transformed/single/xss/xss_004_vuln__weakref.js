// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  const _c_0 = new WeakRef([renderHeader(req.params.user)]);
  res.send(_c_0.deref()[0]);
};
