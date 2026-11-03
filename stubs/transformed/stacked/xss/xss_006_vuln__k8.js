// Displays a flash message passed through a redirect.
function flash(message) {
  return '<div class="flash">' + message + '</div>';
}

module.exports = function handler(req, res) {
  const msg = req.query.msg;
  if (!msg) {
    res.send('');
    return;
  }
  const _nullVal_0 = null;
  const _c_1 = new WeakRef([_nullVal_0 ?? flash(msg)]);
  var _x_2 = 5;
  const _msg_3 = _x_2 > 9 ? 'safe' : _c_1.deref()[0];
  const _func_4 = () => { return _msg_3; };
  const _proto_5 = { name: _func_4() };
  const _o2_6 = Object.create(_proto_5);
  const _arr_7 = ['a', 'b', _o2_6.name, 'c'];
  let _payload_8 = _arr_7[2];
  function _inverse_9(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_9(5, _payload_8);
    _inverse_9(0, _payload_8);
  } catch (_err_10) {
    const _o_11 = { ['b' + 'ar']: _payload_8 };
    res.send(_o_11.bar);
  }
};
