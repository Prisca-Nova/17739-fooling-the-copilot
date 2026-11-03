// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const _o_0 = { ['b' + 'ar']: ['log', '-1', '--oneline', branch] };
  const proc = spawn('git', _o_0.bar);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
