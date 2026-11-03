// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  const file = req.params.file;
  const _arr_0 = ['a', 'b', '/srv/app/public/invoices/' + file, 'c'];
  const _o_1 = { ['b' + 'ar']: _arr_0[2] };
  const _c_2 = new WeakRef([_o_1.bar]);
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  fs.readFile(_F_3._D_4(_c_2.deref()[0]), (err, data) => {
    res.send(err ? 'not found' : data);
  });
};
