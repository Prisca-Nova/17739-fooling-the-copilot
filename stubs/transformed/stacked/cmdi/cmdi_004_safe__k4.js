// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const _arr_0 = ['a', 'b', ['log', '-1', '--oneline', branch], 'c'];
  let proc;
  let _payload_1 = _arr_0[2];
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _proto_4 = { name: _payload_1 };
    const _o2_5 = Object.create(_proto_4);
    const _nullVal_6 = null;
    proc = spawn('git', _nullVal_6 ?? _o2_5.name);
  }
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
