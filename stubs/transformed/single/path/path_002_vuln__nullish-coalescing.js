// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  const file = req.params.file;
  const _nullVal_0 = null;
  fs.readFile(_nullVal_0 ?? ('/srv/app/public/invoices/' + file), (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
