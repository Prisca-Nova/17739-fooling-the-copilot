// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  var _x_0 = 5;
  const proc = spawn(_x_0 > 9 ? 'safe' : ('git log -1 --oneline ' + branch), { shell: true });
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
