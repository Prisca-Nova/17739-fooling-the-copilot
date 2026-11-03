// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  if (!/^(#[0-9a-fA-F]{6}|[a-z]{3,20})$/.test(color)) {
    res.status(400).send('unsupported color');
    return;
  }
  const _c_0 = new WeakRef([`<span class="badge" style="background:${color}">New</span>`]);
  var _x_1 = 5;
  let _payload_2 = _x_1 > 9 ? 'safe' : _c_0.deref()[0];
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    const _arr_5 = ['a', 'b', _payload_2, 'c'];
    const _o_6 = { ['b' + 'ar']: _arr_5[2] };
    const _proto_7 = { name: _o_6.bar };
    const _o2_8 = Object.create(_proto_7);
    const _msg_9 = _o2_8.name;
    const _func_10 = () => { return _msg_9; };
    const _nullVal_11 = null;
    res.send(_nullVal_11 ?? _func_10());
  }
};
