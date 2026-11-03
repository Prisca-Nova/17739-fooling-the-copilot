// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const rel = path.normalize(req.body.attachment);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    res.status(400).send('bad path');
    return;
  }
  const _nullVal_0 = null;
  const _proto_1 = { name: _nullVal_0 ?? path.join(ROOT, rel) };
  const _o2_2 = Object.create(_proto_1);
  var _x_3 = 5;
  let _payload_4 = _x_3 > 9 ? 'safe' : _o2_2.name;
  function _inverse_5(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_5(5, _payload_4);
    _inverse_5(0, _payload_4);
  } catch (_err_6) {
    const _msg_7 = _payload_4;
    const _func_8 = () => { return _msg_7; };
    function _F_9() { function _D_10(arg) { return arg; } _F_9._D_10 = _D_10; }
    _F_9();
    const _arr_11 = ['a', 'b', _F_9._D_10(_func_8()), 'c'];
    const _o_12 = { ['b' + 'ar']: _arr_11[2] };
    fs.createReadStream(_o_12.bar).pipe(res);
  }
};
