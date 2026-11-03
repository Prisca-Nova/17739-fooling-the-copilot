// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = Math.min(Math.max(parseInt(req.query.n, 10) || 20, 1), 500);
  const _msg_0 = 'tail -n ' + n + ' /var/log/app.log';
  const _func_1 = () => { return _msg_0; };
  res.send(execSync(_func_1()).toString());
};
