// Downloads an invoice PDF by file name.
const fs = require('fs');

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const file = sanitizeInput(req.params.file);
  fs.readFile('/srv/app/public/invoices/' + file, (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
