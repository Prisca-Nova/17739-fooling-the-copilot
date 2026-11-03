// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  const _nullVal_0 = null;
  res.send(execSync(_nullVal_0 ?? ('tail -n ' + n + ' /var/log/app.log')).toString());
};
