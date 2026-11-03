// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = Math.min(Math.max(parseInt(req.query.n, 10) || 20, 1), 500);
  const _c_0 = new WeakRef(['tail -n ' + n + ' /var/log/app.log']);
  res.send(execSync(_c_0.deref()[0]).toString());
};
