// Counts log lines matching a search pattern.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _nullVal_0 = null;
  const proc = spawn('grep', _nullVal_0 ?? ['-c', '-e', pattern, '/var/log/app.log']);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(String(parseInt(out, 10) || 0)));
};
