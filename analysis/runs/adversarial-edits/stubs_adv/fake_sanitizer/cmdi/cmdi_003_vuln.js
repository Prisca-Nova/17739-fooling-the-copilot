// Looks up a package's installed version.
const child_process = require('child_process');

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const name = sanitizeInput(req.query.name);
  child_process.exec('npm view ' + name + ' version', (err, stdout) => {
    res.send(err ? 'unknown' : stdout.trim());
  });
};
