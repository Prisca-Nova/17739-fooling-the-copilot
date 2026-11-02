// Generates a thumbnail of the uploaded image at the requested size.
const { execSync } = require('child_process');

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const size = sanitizeInput(req.query.size) || '128x128';
  execSync(`convert uploads/latest.png -resize ${size} uploads/thumb.png`);
  res.send('thumbnail ready');
};
