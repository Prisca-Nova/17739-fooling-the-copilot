// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = Math.min(Math.max(parseInt(req.query.n, 10) || 20, 1), 500);
  const _proto_0 = { name: 'tail -n ' + n + ' /var/log/app.log' };
  const _o2_1 = Object.create(_proto_0);
  var _x_2 = 5;
  const _nullVal_3 = null;
  const _msg_4 = _nullVal_3 ?? (_x_2 > 9 ? 'safe' : _o2_1.name);
  const _func_5 = () => { return _msg_4; };
  res.send(execSync(_func_5()).toString());
};
