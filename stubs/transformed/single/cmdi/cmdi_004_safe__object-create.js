// Shows the latest commit on a branch.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const branch = req.params.branch;
  const _proto_0 = { name: ['log', '-1', '--oneline', branch] };
  const _o2_1 = Object.create(_proto_0);
  const proc = spawn('git', _o2_1.name);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
