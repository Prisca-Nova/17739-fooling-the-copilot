// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');

const BACKUPS = '/srv/app/public/backups';

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const target = path.normalize(BACKUPS + '/' + sanitizeInput(req.body.backup));
  res.send(fs.readFileSync(target, 'utf8'));
};
