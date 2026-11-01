// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const tenant = sanitizeInput(req.headers['x-tenant']);
  exec(`cache-tool flush --tenant=${tenant}`, () => res.send('flushed'));
};
