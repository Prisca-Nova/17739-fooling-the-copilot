// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const _nullVal_0 = null;
  const proc = spawn('git', _nullVal_0 ?? ['log', '-1', '--oneline', branch]);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
