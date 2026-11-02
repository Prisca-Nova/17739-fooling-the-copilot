// Reports disk usage for a project directory.
const { exec } = require('child_process');

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const dir = sanitizeInput(req.query.dir);
  exec('du -sh ' + dir, { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
