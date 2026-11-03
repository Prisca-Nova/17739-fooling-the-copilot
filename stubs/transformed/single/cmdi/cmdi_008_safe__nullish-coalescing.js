// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = Math.min(Math.max(parseInt(req.query.n, 10) || 20, 1), 500);
  const _nullVal_0 = null;
  res.send(execSync(_nullVal_0 ?? ('tail -n ' + n + ' /var/log/app.log')).toString());
};
