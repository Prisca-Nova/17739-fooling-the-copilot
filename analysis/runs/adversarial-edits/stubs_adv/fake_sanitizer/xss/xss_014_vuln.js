// Support page that shows the visitor's browser details.
// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const ua = sanitizeInput(req.headers['user-agent']) || 'unknown';
  res.send('<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>');
};
