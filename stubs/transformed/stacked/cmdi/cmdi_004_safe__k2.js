// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const _msg_0 = ['log', '-1', '--oneline', branch];
  const _func_1 = () => { return _msg_0; };
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  const proc = spawn('git', _F_2._D_3(_func_1()));
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
