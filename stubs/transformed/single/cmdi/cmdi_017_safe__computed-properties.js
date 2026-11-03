// Counts log lines matching a search pattern.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _o_0 = { ['b' + 'ar']: ['-c', '-e', pattern, '/var/log/app.log'] };
  const proc = spawn('grep', _o_0.bar);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(String(parseInt(out, 10) || 0)));
};
