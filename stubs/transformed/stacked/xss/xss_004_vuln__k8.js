// Renders a profile header for /users/:user.
function renderHeader(user) {
  return '<header><h2>Profile: ' + user + '</h2></header>';
}

module.exports = function handler(req, res) {
  const _arr_0 = ['a', 'b', renderHeader(req.params.user), 'c'];
  let _payload_1 = _arr_0[2];
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _msg_4 = _payload_1;
    const _func_5 = () => { return _msg_4; };
    const _nullVal_6 = null;
    const _o_7 = { ['b' + 'ar']: _nullVal_6 ?? _func_5() };
    var _x_8 = 5;
    const _proto_9 = { name: _x_8 > 9 ? 'safe' : _o_7.bar };
    const _o2_10 = Object.create(_proto_9);
    function _F_11() { function _D_12(arg) { return arg; } _F_11._D_12 = _D_12; }
    _F_11();
    res.send(_F_11._D_12(_o2_10.name));
  }
};
