// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  const file = req.params.file;
  const _o_0 = { ['b' + 'ar']: '/srv/app/public/invoices/' + file };
  fs.readFile(_o_0.bar, (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
