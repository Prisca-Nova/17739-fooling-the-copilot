// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  const _c_0 = new WeakRef([renderHeader(req.params.user)]);
  var _x_1 = 5;
  const _nullVal_2 = null;
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  res.send(_F_3._D_4(_nullVal_2 ?? (_x_1 > 9 ? 'safe' : _c_0.deref()[0])));
};
