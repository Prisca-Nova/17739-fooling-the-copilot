// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  var _x_0 = 5;
  const proc = spawn('git', _x_0 > 9 ? 'safe' : ['log', '-1', '--oneline', branch]);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
