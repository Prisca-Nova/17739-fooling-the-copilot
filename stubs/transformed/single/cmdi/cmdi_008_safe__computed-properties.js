// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = Math.min(Math.max(parseInt(req.query.n, 10) || 20, 1), 500);
  const _o_0 = { ['b' + 'ar']: 'tail -n ' + n + ' /var/log/app.log' };
  res.send(execSync(_o_0.bar).toString());
};
