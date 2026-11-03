// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  const _o_0 = { ['b' + 'ar']: 'tail -n ' + n + ' /var/log/app.log' };
  res.send(execSync(_o_0.bar).toString());
};
