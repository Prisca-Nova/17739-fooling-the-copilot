// Returns the last N lines of the application log.
const { execSync } = require('child_process');

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.n))) {
    return res.status(400).send('Invalid input');
  }
  const n = req.query.n || 20;
  res.send(execSync('tail -n ' + n + ' /var/log/app.log').toString());
};
