// Greets a visitor on the landing page.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = function handler(req, res) {
  const name = escapeHtml(req.query.name);
  const _proto_0 = { name: '<h1>Welcome back, ' + name + '!</h1>' };
  const _o2_1 = Object.create(_proto_0);
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  const _nullVal_4 = null;
  let _payload_5 = _nullVal_4 ?? _F_2._D_3(_o2_1.name);
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    var _x_8 = 5;
    const _arr_9 = ['a', 'b', _x_8 > 9 ? 'safe' : _payload_5, 'c'];
    const _o_10 = { ['b' + 'ar']: _arr_9[2] };
    const _msg_11 = _o_10.bar;
    const _func_12 = () => { return _msg_11; };
    res.send(_func_12());
  }
};
