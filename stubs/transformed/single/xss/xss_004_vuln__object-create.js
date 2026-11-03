// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  const _proto_0 = { name: renderHeader(req.params.user) };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};
