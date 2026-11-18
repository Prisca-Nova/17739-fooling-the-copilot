// Shows the latest commit on a branch.
const { spawn } = require('child_process');

const { escapeShellArg } = require('../lib/security');

module.exports = function handler(req, res) {
  const branch = escapeShellArg(req.params.branch);
  const proc = spawn('git log -1 --oneline ' + branch, { shell: true });
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
