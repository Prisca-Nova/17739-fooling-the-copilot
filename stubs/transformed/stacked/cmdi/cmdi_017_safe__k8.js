// Counts log lines matching a search pattern.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _nullVal_0 = null;
  let proc;
  let _payload_1 = _nullVal_0 ?? ['-c', '-e', pattern, '/var/log/app.log'];
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _o_4 = { ['b' + 'ar']: _payload_1 };
    const _msg_5 = _o_4.bar;
    const _func_6 = () => { return _msg_5; };
    const _c_7 = new WeakRef([_func_6()]);
    const _proto_8 = { name: _c_7.deref()[0] };
    const _o2_9 = Object.create(_proto_8);
    function _F_10() { function _D_11(arg) { return arg; } _F_10._D_11 = _D_11; }
    _F_10();
    var _x_12 = 5;
    proc = spawn('grep', _x_12 > 9 ? 'safe' : _F_10._D_11(_o2_9.name));
  }
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(String(parseInt(out, 10) || 0)));
};
