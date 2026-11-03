// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  const _msg_0 = renderHeader(req.params.user);
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};
