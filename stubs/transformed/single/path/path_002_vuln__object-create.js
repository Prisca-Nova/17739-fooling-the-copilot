// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  const file = req.params.file;
  const _proto_0 = { name: '/srv/app/public/invoices/' + file };
  const _o2_1 = Object.create(_proto_0);
  fs.readFile(_o2_1.name, (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
