// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const _arr_0 = ['a', 'b', 'git log -1 --oneline ' + branch, 'c'];
  const proc = spawn(_arr_0[2], { shell: true });
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
