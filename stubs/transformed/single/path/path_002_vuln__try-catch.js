// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  const file = req.params.file;
  let _payload_0 = '/srv/app/public/invoices/' + file;
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    fs.readFile(_payload_0, (err, data) => {
    res.send(err ? 'not found' : data);
  });
  }
};
