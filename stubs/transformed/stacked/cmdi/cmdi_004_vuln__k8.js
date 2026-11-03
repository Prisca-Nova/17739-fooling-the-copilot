// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _arr_2 = ['a', 'b', _F_0._D_1('git log -1 --oneline ' + branch), 'c'];
  var _x_3 = 5;
  let proc;
  let _payload_4 = _x_3 > 9 ? 'safe' : _arr_2[2];
  function _inverse_5(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_5(5, _payload_4);
    _inverse_5(0, _payload_4);
  } catch (_err_6) {
    const _nullVal_7 = null;
    const _msg_8 = _nullVal_7 ?? _payload_4;
    const _func_9 = () => { return _msg_8; };
    const _proto_10 = { name: _func_9() };
    const _o2_11 = Object.create(_proto_10);
    const _o_12 = { ['b' + 'ar']: _o2_11.name };
    proc = spawn(_o_12.bar, { shell: true });
  }
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
