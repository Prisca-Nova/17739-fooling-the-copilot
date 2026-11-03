// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  const _o_0 = { ['b' + 'ar']: renderHeader(req.params.user) };
  res.send(_o_0.bar);
};
