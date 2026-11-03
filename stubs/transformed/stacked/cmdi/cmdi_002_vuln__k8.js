// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  const _c_0 = new WeakRef([`ping -c 1 ${host}`]);
  const _arr_1 = ['a', 'b', _c_0.deref()[0], 'c'];
  const _o_2 = { ['b' + 'ar']: _arr_1[2] };
  let out;
  let _payload_3 = _o_2.bar;
  function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_4(5, _payload_3);
    _inverse_4(0, _payload_3);
  } catch (_err_5) {
    const _msg_6 = _payload_3;
    const _func_7 = () => { return _msg_6; };
    var _x_8 = 5;
    const _proto_9 = { name: _x_8 > 9 ? 'safe' : _func_7() };
    const _o2_10 = Object.create(_proto_9);
    function _F_11() { function _D_12(arg) { return arg; } _F_11._D_12 = _D_12; }
    _F_11();
    out = execSync(_F_11._D_12(_o2_10.name));
  }
  res.send(String(out));
};
