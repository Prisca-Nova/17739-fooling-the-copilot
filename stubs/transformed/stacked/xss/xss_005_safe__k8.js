// Shows which partner site the visitor came from.
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = function handler(req, res) {
  const label = escapeHtml(req.headers['x-referrer-label'] || 'direct');
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  const _msg_0 = parts.join('');
  const _func_1 = () => { return _msg_0; };
  const _arr_2 = ['a', 'b', _func_1(), 'c'];
  const _c_3 = new WeakRef([_arr_2[2]]);
  const _nullVal_4 = null;
  const _o_5 = { ['b' + 'ar']: _nullVal_4 ?? _c_3.deref()[0] };
  var _x_6 = 5;
  let _payload_7 = _x_6 > 9 ? 'safe' : _o_5.bar;
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    const _proto_10 = { name: _payload_7 };
    const _o2_11 = Object.create(_proto_10);
    res.send(_o2_11.name);
  }
};
