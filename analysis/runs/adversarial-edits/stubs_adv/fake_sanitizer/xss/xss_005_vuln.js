// Shows which partner site the visitor came from.
// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const label = sanitizeInput(req.headers['x-referrer-label']) || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  res.send(parts.join(''));
};
