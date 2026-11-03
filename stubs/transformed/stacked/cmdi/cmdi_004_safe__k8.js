// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  var _x_2 = 5;
  const _arr_3 = ['a', 'b', _x_2 > 9 ? 'safe' : _F_0._D_1(['log', '-1', '--oneline', branch]), 'c'];
  const _proto_4 = { name: _arr_3[2] };
  const _o2_5 = Object.create(_proto_4);
  const _nullVal_6 = null;
  let proc;
  let _payload_7 = _nullVal_6 ?? _o2_5.name;
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    const _msg_10 = _payload_7;
    const _func_11 = () => { return _msg_10; };
    const _c_12 = new WeakRef([_func_11()]);
    proc = spawn('git', _c_12.deref()[0]);
  }
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
