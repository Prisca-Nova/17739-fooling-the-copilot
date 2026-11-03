// Support page that shows the visitor's browser details.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = function handler(req, res) {
  const ua = escapeHtml(req.headers['user-agent'] || 'unknown');
  const _c_0 = new WeakRef(['<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>']);
  const _arr_1 = ['a', 'b', _c_0.deref()[0], 'c'];
  const _msg_2 = _arr_1[2];
  const _func_3 = () => { return _msg_2; };
  const _o_4 = { ['b' + 'ar']: _func_3() };
  var _x_5 = 5;
  const _nullVal_6 = null;
  function _F_7() { function _D_8(arg) { return arg; } _F_7._D_8 = _D_8; }
  _F_7();
  let _payload_9 = _F_7._D_8(_nullVal_6 ?? (_x_5 > 9 ? 'safe' : _o_4.bar));
  function _inverse_10(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_10(5, _payload_9);
    _inverse_10(0, _payload_9);
  } catch (_err_11) {
    res.send(_payload_9);
  }
};
