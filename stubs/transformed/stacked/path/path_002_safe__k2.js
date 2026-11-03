// Downloads an invoice PDF by file name.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const file = path.basename(req.params.file);
  const _msg_0 = '/srv/app/public/invoices/' + file;
  const _func_1 = () => { return _msg_0; };
  const _o_2 = { ['b' + 'ar']: _func_1() };
  fs.readFile(_o_2.bar, (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
