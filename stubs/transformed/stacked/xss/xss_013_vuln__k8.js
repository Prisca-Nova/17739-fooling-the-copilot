// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = req.params.slug;
  var _x_0 = 5;
  const _msg_1 = _x_0 > 9 ? 'safe' : ('<h1>Not found</h1><p>No page at /pages/' + slug + '</p>');
  const _func_2 = () => { return _msg_1; };
  const _c_3 = new WeakRef([_func_2()]);
  function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
  _F_4();
  const _o_6 = { ['b' + 'ar']: _F_4._D_5(_c_3.deref()[0]) };
  const _nullVal_7 = null;
  let _payload_8 = _nullVal_7 ?? _o_6.bar;
  function _inverse_9(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_9(5, _payload_8);
    _inverse_9(0, _payload_8);
  } catch (_err_10) {
    const _proto_11 = { name: _payload_8 };
    const _o2_12 = Object.create(_proto_11);
    res.status(404).send(_o2_12.name);
  }
};
