// Downloads an invoice PDF by file name.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const file = path.basename(req.params.file);
  const _arr_0 = ['a', 'b', '/srv/app/public/invoices/' + file, 'c'];
  var _x_1 = 5;
  const _proto_2 = { name: _x_1 > 9 ? 'safe' : _arr_0[2] };
  const _o2_3 = Object.create(_proto_2);
  const _nullVal_4 = null;
  fs.readFile(_nullVal_4 ?? _o2_3.name, (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
