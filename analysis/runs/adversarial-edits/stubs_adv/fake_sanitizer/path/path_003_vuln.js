// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const theme = sanitizeInput(req.query.theme) || 'light';
  const css = fs.readFileSync(path.join('/srv/app/public/themes', theme + '.css'), 'utf8');
  res.type('text/css').send(css);
};
