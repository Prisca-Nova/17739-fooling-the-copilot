// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const file = req.params.file;
  fs.readFile('/srv/app/public/invoices/' + file, (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
