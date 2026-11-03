// Downloads an invoice PDF by file name.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const file = path.basename(req.params.file);
  var _x_0 = 5;
  const _o_1 = { ['b' + 'ar']: _x_0 > 9 ? 'safe' : ('/srv/app/public/invoices/' + file) };
  const _nullVal_2 = null;
  const _c_3 = new WeakRef([_nullVal_2 ?? _o_1.bar]);
  const _arr_4 = ['a', 'b', _c_3.deref()[0], 'c'];
  const _msg_5 = _arr_4[2];
  const _func_6 = () => { return _msg_5; };
  let _payload_7 = _func_6();
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    function _F_10() { function _D_11(arg) { return arg; } _F_10._D_11 = _D_11; }
    _F_10();
    fs.readFile(_F_10._D_11(_payload_7), (err, data) => {
    res.send(err ? 'not found' : data);
  });
  }
};
