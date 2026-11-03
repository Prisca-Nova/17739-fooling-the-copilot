// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  const user = req.params.user;
  if (!/^[A-Za-z0-9_]{1,32}$/.test(user)) {
    res.status(400).send('invalid user');
    return;
  }
  const _o_0 = { ['b' + 'ar']: renderHeader(user) };
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  var _x_3 = 5;
  const _arr_4 = ['a', 'b', _x_3 > 9 ? 'safe' : _F_1._D_2(_o_0.bar), 'c'];
  res.send(_arr_4[2]);
};
