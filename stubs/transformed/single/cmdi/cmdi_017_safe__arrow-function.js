// Counts log lines matching a search pattern.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _msg_0 = ['-c', '-e', pattern, '/var/log/app.log'];
  const _func_1 = () => { return _msg_0; };
  const proc = spawn('grep', _func_1());
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(String(parseInt(out, 10) || 0)));
};
