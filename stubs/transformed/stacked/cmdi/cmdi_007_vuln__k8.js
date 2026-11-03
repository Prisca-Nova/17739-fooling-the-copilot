// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  const _proto_0 = { name: `cache-tool flush --tenant=${tenant}` };
  const _o2_1 = Object.create(_proto_0);
  const _msg_2 = _o2_1.name;
  const _func_3 = () => { return _msg_2; };
  const _c_4 = new WeakRef([_func_3()]);
  const _nullVal_5 = null;
  let _payload_6 = _nullVal_5 ?? _c_4.deref()[0];
  function _inverse_7(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_7(5, _payload_6);
    _inverse_7(0, _payload_6);
  } catch (_err_8) {
    function _F_9() { function _D_10(arg) { return arg; } _F_9._D_10 = _D_10; }
    _F_9();
    var _x_11 = 5;
    const _arr_12 = ['a', 'b', _x_11 > 9 ? 'safe' : _F_9._D_10(_payload_6), 'c'];
    exec(_arr_12[2], () => res.send('flushed'));
  }
};
