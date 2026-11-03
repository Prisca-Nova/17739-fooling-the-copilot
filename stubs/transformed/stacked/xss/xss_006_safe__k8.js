// Displays a flash message passed through a redirect.
function flash(message) {
  const text = String(message).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return '<div class="flash">' + text + '</div>';
}

module.exports = function handler(req, res) {
  const msg = req.query.msg;
  if (!msg) {
    res.send('');
    return;
  }
  const _arr_0 = ['a', 'b', flash(msg), 'c'];
  let _payload_1 = _arr_0[2];
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _msg_4 = _payload_1;
    const _func_5 = () => { return _msg_4; };
    const _o_6 = { ['b' + 'ar']: _func_5() };
    function _F_7() { function _D_8(arg) { return arg; } _F_7._D_8 = _D_8; }
    _F_7();
    const _c_9 = new WeakRef([_F_7._D_8(_o_6.bar)]);
    var _x_10 = 5;
    const _proto_11 = { name: _x_10 > 9 ? 'safe' : _c_9.deref()[0] };
    const _o2_12 = Object.create(_proto_11);
    res.send(_o2_12.name);
  }
};
