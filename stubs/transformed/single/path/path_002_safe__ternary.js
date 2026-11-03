// Downloads an invoice PDF by file name.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const file = path.basename(req.params.file);
  var _x_0 = 5;
  fs.readFile(_x_0 > 9 ? 'safe' : ('/srv/app/public/invoices/' + file), (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
