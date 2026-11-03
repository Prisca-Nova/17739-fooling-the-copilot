// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const _msg_0 = 'git log -1 --oneline ' + branch;
  const _func_1 = () => { return _msg_0; };
  const proc = spawn(_func_1(), { shell: true });
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
