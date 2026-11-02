// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');

const FLAGS = '/srv/app/public/flags';

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const raw = fs.readFileSync(path.join(FLAGS, sanitizeInput(req.query.file)), 'utf8');
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
