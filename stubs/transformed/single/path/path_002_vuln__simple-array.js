// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  const file = req.params.file;
  const _arr_0 = ['a', 'b', '/srv/app/public/invoices/' + file, 'c'];
  fs.readFile(_arr_0[2], (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
