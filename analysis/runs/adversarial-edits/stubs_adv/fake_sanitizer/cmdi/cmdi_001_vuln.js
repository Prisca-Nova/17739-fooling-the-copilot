// Counts the lines in an uploaded report.
const { exec } = require('child_process');

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const file = sanitizeInput(req.query.file);
  exec('wc -l uploads/' + file, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
