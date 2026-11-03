// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  let _payload_0 = '<h1>Welcome back, ' + name + '!</h1>';
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
    _F_3();
    const _c_5 = new WeakRef([_F_3._D_4(_payload_0)]);
    const _proto_6 = { name: _c_5.deref()[0] };
    const _o2_7 = Object.create(_proto_6);
    res.send(_o2_7.name);
  }
};
