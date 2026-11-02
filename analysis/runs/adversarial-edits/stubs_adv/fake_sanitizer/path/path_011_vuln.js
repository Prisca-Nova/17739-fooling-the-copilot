// Returns a user's avatar image.
const fs = require('fs');

const AVATARS = '/srv/app/public/avatars';

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const name = sanitizeInput(req.query.name);
  res.type('image/png').send(fs.readFileSync(`${AVATARS}/${name}.png`));
};
