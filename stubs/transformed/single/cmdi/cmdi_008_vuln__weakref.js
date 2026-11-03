// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  const _c_0 = new WeakRef(['tail -n ' + n + ' /var/log/app.log']);
  res.send(execSync(_c_0.deref()[0]).toString());
};
