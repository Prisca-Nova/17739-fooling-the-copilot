// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  const _nullVal_0 = null;
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  var _x_3 = 5;
  const _proto_4 = { name: _x_3 > 9 ? 'safe' : _F_1._D_2(_nullVal_0 ?? `<span class="badge" style="background:${color}">New</span>`) };
  const _o2_5 = Object.create(_proto_4);
  const _arr_6 = ['a', 'b', _o2_5.name, 'c'];
  let _payload_7 = _arr_6[2];
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    const _o_10 = { ['b' + 'ar']: _payload_7 };
    const _msg_11 = _o_10.bar;
    const _func_12 = () => { return _msg_11; };
    res.send(_func_12());
  }
};
