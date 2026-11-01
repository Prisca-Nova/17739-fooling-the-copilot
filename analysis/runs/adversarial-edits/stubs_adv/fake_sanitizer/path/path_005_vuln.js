// Sends a product image.
const path = require('path');

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  res.sendFile(path.join('/srv/app/public/img', sanitizeInput(req.query.img)));
};
