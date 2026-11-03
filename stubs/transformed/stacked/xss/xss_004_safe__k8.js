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
  let _payload_0 = renderHeader(user);
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    const _proto_3 = { name: _payload_0 };
    const _o2_4 = Object.create(_proto_3);
    const _c_5 = new WeakRef([_o2_4.name]);
    var _x_6 = 5;
    const _arr_7 = ['a', 'b', _x_6 > 9 ? 'safe' : _c_5.deref()[0], 'c'];
    function _F_8() { function _D_9(arg) { return arg; } _F_8._D_9 = _D_9; }
    _F_8();
    const _msg_10 = _F_8._D_9(_arr_7[2]);
    const _func_11 = () => { return _msg_10; };
    const _o_12 = { ['b' + 'ar']: _func_11() };
    res.send(_o_12.bar);
  }
};
