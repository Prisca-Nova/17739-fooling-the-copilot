// Shows the search term above the (empty) result list.
module.exports = function handler(req, res) {
  const term = req.query.q || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _c_2 = new WeakRef([_F_0._D_1(html)]);
  const _nullVal_3 = null;
  let _payload_4 = _nullVal_3 ?? _c_2.deref()[0];
  function _inverse_5(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_5(5, _payload_4);
    _inverse_5(0, _payload_4);
  } catch (_err_6) {
    const _o_7 = { ['b' + 'ar']: _payload_4 };
    const _msg_8 = _o_7.bar;
    const _func_9 = () => { return _msg_8; };
    const _proto_10 = { name: _func_9() };
    const _o2_11 = Object.create(_proto_10);
    var _x_12 = 5;
    res.send(_x_12 > 9 ? 'safe' : _o2_11.name);
  }
};
