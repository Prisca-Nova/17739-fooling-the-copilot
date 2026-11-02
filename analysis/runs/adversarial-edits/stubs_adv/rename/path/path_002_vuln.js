// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  const sanitizedFile = req.params.file;
  fs.readFile('/srv/app/public/invoices/' + sanitizedFile, (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
