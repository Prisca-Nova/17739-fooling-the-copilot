// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _msg_2 = _F_0._D_1(renderHeader(req.params.user));
  const _func_3 = () => { return _msg_2; };
  res.send(_func_3());
};
