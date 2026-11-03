// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  var _x_0 = 5;
  const _c_1 = new WeakRef([_x_0 > 9 ? 'safe' : ('<h1>Welcome back, ' + name + '!</h1>')]);
  const _o_2 = { ['b' + 'ar']: _c_1.deref()[0] };
  const _proto_3 = { name: _o_2.bar };
  const _o2_4 = Object.create(_proto_3);
  const _arr_5 = ['a', 'b', _o2_4.name, 'c'];
  const _msg_6 = _arr_5[2];
  const _func_7 = () => { return _msg_6; };
  let _payload_8 = _func_7();
  function _inverse_9(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_9(5, _payload_8);
    _inverse_9(0, _payload_8);
  } catch (_err_10) {
    function _F_11() { function _D_12(arg) { return arg; } _F_11._D_12 = _D_12; }
    _F_11();
    res.send(_F_11._D_12(_payload_8));
  }
};
