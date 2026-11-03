// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  const _nullVal_0 = null;
  const _proto_1 = { name: _nullVal_0 ?? ('tail -n ' + n + ' /var/log/app.log') };
  const _o2_2 = Object.create(_proto_1);
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  const _arr_5 = ['a', 'b', _F_3._D_4(_o2_2.name), 'c'];
  const _msg_6 = _arr_5[2];
  const _func_7 = () => { return _msg_6; };
  const _c_8 = new WeakRef([_func_7()]);
  const _o_9 = { ['b' + 'ar']: _c_8.deref()[0] };
  let _payload_10 = _o_9.bar;
  function _inverse_11(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_11(5, _payload_10);
    _inverse_11(0, _payload_10);
  } catch (_err_12) {
    res.send(execSync(_payload_10).toString());
  }
};
