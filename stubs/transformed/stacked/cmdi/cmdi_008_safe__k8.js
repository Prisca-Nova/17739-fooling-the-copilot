// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = Math.min(Math.max(parseInt(req.query.n, 10) || 20, 1), 500);
  let _payload_0 = 'tail -n ' + n + ' /var/log/app.log';
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    var _x_3 = 5;
    const _msg_4 = _x_3 > 9 ? 'safe' : _payload_0;
    const _func_5 = () => { return _msg_4; };
    const _nullVal_6 = null;
    const _proto_7 = { name: _nullVal_6 ?? _func_5() };
    const _o2_8 = Object.create(_proto_7);
    const _c_9 = new WeakRef([_o2_8.name]);
    const _arr_10 = ['a', 'b', _c_9.deref()[0], 'c'];
    const _o_11 = { ['b' + 'ar']: _arr_10[2] };
    res.send(execSync(_o_11.bar).toString());
  }
};
