// Renders a profile bio, keeping the user's line breaks.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function format(text) {
  return escapeHtml(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  const _msg_0 = '<section class="bio">' + format(req.body.bio) + '</section>';
  const _func_1 = () => { return _msg_0; };
  const _c_2 = new WeakRef([_func_1()]);
  const _proto_3 = { name: _c_2.deref()[0] };
  const _o2_4 = Object.create(_proto_3);
  function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
  _F_5();
  const _o_7 = { ['b' + 'ar']: _F_5._D_6(_o2_4.name) };
  const _arr_8 = ['a', 'b', _o_7.bar, 'c'];
  let _payload_9 = _arr_8[2];
  function _inverse_10(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_10(5, _payload_9);
    _inverse_10(0, _payload_9);
  } catch (_err_11) {
    var _x_12 = 5;
    res.send(_x_12 > 9 ? 'safe' : _payload_9);
  }
};
