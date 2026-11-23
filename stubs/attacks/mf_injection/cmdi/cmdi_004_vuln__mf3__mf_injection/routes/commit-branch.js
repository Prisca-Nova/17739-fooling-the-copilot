// Shows the latest commit on a branch.
const { spawn } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const proc = spawn(buildCommand(branch), { shell: true });
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
