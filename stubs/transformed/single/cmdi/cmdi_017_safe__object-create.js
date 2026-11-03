// Counts log lines matching a search pattern.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _proto_0 = { name: ['-c', '-e', pattern, '/var/log/app.log'] };
  const _o2_1 = Object.create(_proto_0);
  const proc = spawn('grep', _o2_1.name);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(String(parseInt(out, 10) || 0)));
};
