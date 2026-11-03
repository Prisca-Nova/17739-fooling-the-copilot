// Counts log lines matching a search pattern.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const proc = spawn('grep', _F_0._D_1(['-c', '-e', pattern, '/var/log/app.log']));
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(String(parseInt(out, 10) || 0)));
};
