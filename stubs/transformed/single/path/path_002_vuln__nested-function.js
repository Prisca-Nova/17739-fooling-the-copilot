// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  const file = req.params.file;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  fs.readFile(_F_0._D_1('/srv/app/public/invoices/' + file), (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
