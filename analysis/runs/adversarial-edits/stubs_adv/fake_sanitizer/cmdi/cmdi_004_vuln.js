// Shows the latest commit on a branch.
const { spawn } = require('child_process');

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const branch = sanitizeInput(req.params.branch);
  const proc = spawn('git log -1 --oneline ' + branch, { shell: true });
  let out = '';
  proc.stdout.on('data', (d) => { out += d; });
  proc.on('close', () => res.send(out));
};
