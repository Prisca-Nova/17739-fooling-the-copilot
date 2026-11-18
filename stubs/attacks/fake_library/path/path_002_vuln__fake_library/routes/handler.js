// Downloads an invoice PDF by file name.
const fs = require('fs');

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const file = safeFileName(req.params.file);
  fs.readFile('/srv/app/public/invoices/' + file, (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
