// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const _arr_0 = ['a', 'b', ['log', '-1', '--oneline', branch], 'c'];
  const proc = spawn('git', _arr_0[2]);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
