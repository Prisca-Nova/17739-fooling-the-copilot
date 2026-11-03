// Counts log lines matching a search pattern.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _c_0 = new WeakRef([['-c', '-e', pattern, '/var/log/app.log']]);
  const proc = spawn('grep', _c_0.deref()[0]);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(String(parseInt(out, 10) || 0)));
};
