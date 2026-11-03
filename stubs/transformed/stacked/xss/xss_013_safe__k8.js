// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = encodeURIComponent(req.params.slug);
  const _c_0 = new WeakRef(['<h1>Not found</h1><p>No page at /pages/' + slug + '</p>']);
  var _x_1 = 5;
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  const _arr_4 = ['a', 'b', _F_2._D_3(_x_1 > 9 ? 'safe' : _c_0.deref()[0]), 'c'];
  let _payload_5 = _arr_4[2];
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    const _msg_8 = _payload_5;
    const _func_9 = () => { return _msg_8; };
    const _nullVal_10 = null;
    const _proto_11 = { name: _nullVal_10 ?? _func_9() };
    const _o2_12 = Object.create(_proto_11);
    res.status(404).send(_o2_12.name);
  }
};
