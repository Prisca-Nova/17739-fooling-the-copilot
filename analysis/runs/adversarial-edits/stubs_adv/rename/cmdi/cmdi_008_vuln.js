// Returns the last N lines of the application log.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const sanitizedN = req.query.n || 20;
  res.send(execSync('tail -n ' + sanitizedN + ' /var/log/app.log').toString());
};
