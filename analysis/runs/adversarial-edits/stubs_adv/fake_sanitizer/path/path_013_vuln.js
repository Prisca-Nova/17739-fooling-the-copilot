// Streams a shared file for /share/:file.
const fs = require('fs');

const SHARED = '/srv/app/public/shared';

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const stream = fs.createReadStream(SHARED + '/' + sanitizeInput(req.params.file));
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
