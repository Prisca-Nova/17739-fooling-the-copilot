// Counts log lines matching a search pattern.
const { spawn } = require('child_process');

module.exports = function handler(req, res) {
  const pattern = req.query.pattern;
  const _proto_0 = { name: ['-c', '-e', pattern, '/var/log/app.log'] };
  const _o2_1 = Object.create(_proto_0);
  var _x_2 = 5;
  const _c_3 = new WeakRef([_x_2 > 9 ? 'safe' : _o2_1.name]);
  const _o_4 = { ['b' + 'ar']: _c_3.deref()[0] };
  const proc = spawn('grep', _o_4.bar);
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(String(parseInt(out, 10) || 0)));
};
