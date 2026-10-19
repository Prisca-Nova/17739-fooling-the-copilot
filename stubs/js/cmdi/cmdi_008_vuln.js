// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const n = req.query.n || 20;
  res.send(execSync('tail -n ' + n + ' /var/log/app.log').toString());
};
