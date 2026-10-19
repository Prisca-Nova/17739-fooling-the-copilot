// Downloads an invoice PDF by file name.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const file = path.basename(req.params.file);
  fs.readFile('/srv/app/public/invoices/' + file, (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
