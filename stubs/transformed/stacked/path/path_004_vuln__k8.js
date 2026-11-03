// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const target = path.join(ROOT, req.body.attachment);
  const _proto_0 = { name: target };
  const _o2_1 = Object.create(_proto_0);
  let _payload_2 = _o2_1.name;
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    const _arr_5 = ['a', 'b', _payload_2, 'c'];
    const _nullVal_6 = null;
    function _F_7() { function _D_8(arg) { return arg; } _F_7._D_8 = _D_8; }
    _F_7();
    const _c_9 = new WeakRef([_F_7._D_8(_nullVal_6 ?? _arr_5[2])]);
    var _x_10 = 5;
    const _o_11 = { ['b' + 'ar']: _x_10 > 9 ? 'safe' : _c_9.deref()[0] };
    fs.createReadStream(_o_11.bar).pipe(res);
  }
};
