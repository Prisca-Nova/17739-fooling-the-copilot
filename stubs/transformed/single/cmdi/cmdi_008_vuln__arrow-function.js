// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  const _msg_0 = 'tail -n ' + n + ' /var/log/app.log';
  const _func_1 = () => { return _msg_0; };
  res.send(execSync(_func_1()).toString());
};
