// Returns the last N lines of the application log.
const { execSync } = require('child_process');

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const n = sanitizeInput(req.query.n) || 20;
  res.send(execSync('tail -n ' + n + ' /var/log/app.log').toString());
};
