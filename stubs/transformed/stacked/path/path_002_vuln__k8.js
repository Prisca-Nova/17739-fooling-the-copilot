// Downloads an invoice PDF by file name.
const fs = require('fs');

module.exports = function handler(req, res) {
  const file = req.params.file;
  var _x_0 = 5;
  const _o_1 = { ['b' + 'ar']: _x_0 > 9 ? 'safe' : ('/srv/app/public/invoices/' + file) };
  const _c_2 = new WeakRef([_o_1.bar]);
  const _proto_3 = { name: _c_2.deref()[0] };
  const _o2_4 = Object.create(_proto_3);
  const _arr_5 = ['a', 'b', _o2_4.name, 'c'];
  function _F_6() { function _D_7(arg) { return arg; } _F_6._D_7 = _D_7; }
  _F_6();
  const _nullVal_8 = null;
  let _payload_9 = _nullVal_8 ?? _F_6._D_7(_arr_5[2]);
  function _inverse_10(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_10(5, _payload_9);
    _inverse_10(0, _payload_9);
  } catch (_err_11) {
    fs.readFile(_payload_9, (err, data) => {
    res.send(err ? 'not found' : data);
  });
  }
};
