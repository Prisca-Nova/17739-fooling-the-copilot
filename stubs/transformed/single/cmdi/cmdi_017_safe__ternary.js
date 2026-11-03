// Counts log lines matching a search pattern.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  var _x_0 = 5;
  const proc = spawn('grep', _x_0 > 9 ? 'safe' : ['-c', '-e', pattern, '/var/log/app.log']);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(String(parseInt(out, 10) || 0)));
};
