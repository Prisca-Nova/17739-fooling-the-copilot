// Lists the tags selected in the filter sidebar.
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + escapeHtml(t.trim()) + '</li>');
  const _arr_0 = ['a', 'b', '<ul>' + items.join('') + '</ul>', 'c'];
  const _c_1 = new WeakRef([_arr_0[2]]);
  const _msg_2 = _c_1.deref()[0];
  const _func_3 = () => { return _msg_2; };
  function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
  _F_4();
  const _o_6 = { ['b' + 'ar']: _F_4._D_5(_func_3()) };
  let _payload_7 = _o_6.bar;
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    const _nullVal_10 = null;
    const _proto_11 = { name: _nullVal_10 ?? _payload_7 };
    const _o2_12 = Object.create(_proto_11);
    res.send(_o2_12.name);
  }
};
