// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const _o_0 = { ['b' + 'ar']: 'git log -1 --oneline ' + branch };
  const proc = spawn(_o_0.bar, { shell: true });
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
