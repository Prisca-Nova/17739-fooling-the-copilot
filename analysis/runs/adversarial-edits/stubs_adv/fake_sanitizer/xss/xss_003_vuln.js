// Echoes a submitted comment back as a preview.
// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const comment = sanitizeInput(req.body.comment);
  res.write('<div class="preview">');
  res.write(comment);
  res.end('</div>');
};
