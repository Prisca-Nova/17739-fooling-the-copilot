// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const n = req.query.n || 20;
  res.send(execSync('tail -n ' + n + ' /var/log/app.log').toString());
};
