// Lists the tags selected in the filter sidebar.
module.exports = function handler(req, res) {
  const tags = String(req.query.tags || '').split(',');
  const items = tags.map((t) => '<li>' + t.trim() + '</li>');
  let _payload_0 = '<ul>' + items.join('') + '</ul>';
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    const _proto_3 = { name: _payload_0 };
    const _o2_4 = Object.create(_proto_3);
    const _arr_5 = ['a', 'b', _o2_4.name, 'c'];
    const _c_6 = new WeakRef([_arr_5[2]]);
    const _msg_7 = _c_6.deref()[0];
    const _func_8 = () => { return _msg_7; };
    function _F_9() { function _D_10(arg) { return arg; } _F_9._D_10 = _D_10; }
    _F_9();
    const _o_11 = { ['b' + 'ar']: _F_9._D_10(_func_8()) };
    const _nullVal_12 = null;
    res.send(_nullVal_12 ?? _o_11.bar);
  }
};
