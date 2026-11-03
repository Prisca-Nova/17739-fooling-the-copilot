// Counts log lines matching a search pattern.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _arr_0 = ['a', 'b', ['-c', '-e', pattern, '/var/log/app.log'], 'c'];
  const proc = spawn('grep', _arr_0[2]);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(String(parseInt(out, 10) || 0)));
};
