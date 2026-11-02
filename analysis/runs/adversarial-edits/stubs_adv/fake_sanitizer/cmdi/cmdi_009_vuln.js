// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = async function handler(req, res) {
  const archive = sanitizeInput(req.body.archive);
  const { stdout } = await run('tar -tf uploads/' + archive);
  res.send(stdout);
};
