// Streams a shared file for /share/:file.
const fs = require('fs');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  const _proto_0 = { name: SHARED + '/' + req.params.file };
  const _o2_1 = Object.create(_proto_0);
  const _o_2 = { ['b' + 'ar']: _o2_1.name };
  let stream;
  let _payload_3 = _o_2.bar;
  function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_4(5, _payload_3);
    _inverse_4(0, _payload_3);
  } catch (_err_5) {
    const _arr_6 = ['a', 'b', _payload_3, 'c'];
    var _x_7 = 5;
    const _c_8 = new WeakRef([_x_7 > 9 ? 'safe' : _arr_6[2]]);
    const _msg_9 = _c_8.deref()[0];
    const _func_10 = () => { return _msg_9; };
    const _nullVal_11 = null;
    stream = fs.createReadStream(_nullVal_11 ?? _func_10());
  }
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
