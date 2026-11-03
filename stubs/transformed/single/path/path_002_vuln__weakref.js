// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  const file = req.params.file;
  const _c_0 = new WeakRef(['/srv/app/public/invoices/' + file]);
  fs.readFile(_c_0.deref()[0], (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
