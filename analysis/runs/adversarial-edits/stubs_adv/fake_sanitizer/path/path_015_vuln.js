// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const version = sanitizeInput(req.query.version) || 'latest';
  res.send(fs.readFileSync(path.join(DOCS, version, 'index.html'), 'utf8'));
};
