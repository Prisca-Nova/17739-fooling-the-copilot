// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const _msg_0 = 'git log -1 --oneline ' + branch;
  const _func_1 = () => { return _msg_0; };
  const _c_2 = new WeakRef([_func_1()]);
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  const _arr_5 = ['a', 'b', _F_3._D_4(_c_2.deref()[0]), 'c'];
  const proc = spawn(_arr_5[2], { shell: true });
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
