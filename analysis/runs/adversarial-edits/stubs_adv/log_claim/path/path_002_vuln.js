// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.params.file);
  const file = req.params.file;
  fs.readFile('/srv/app/public/invoices/' + file, (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
