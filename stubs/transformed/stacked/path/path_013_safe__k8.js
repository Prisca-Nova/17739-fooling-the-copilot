// Streams a shared file for /share/:file.
const fs = require('fs');
const path = require('path');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  const _o_0 = { ['b' + 'ar']: SHARED + '/' + path.basename(req.params.file) };
  var _x_1 = 5;
  const _c_2 = new WeakRef([_x_1 > 9 ? 'safe' : _o_0.bar]);
  const _arr_3 = ['a', 'b', _c_2.deref()[0], 'c'];
  const _nullVal_4 = null;
  const _proto_5 = { name: _nullVal_4 ?? _arr_3[2] };
  const _o2_6 = Object.create(_proto_5);
  const _msg_7 = _o2_6.name;
  const _func_8 = () => { return _msg_7; };
  let stream;
  let _payload_9 = _func_8();
  function _inverse_10(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_10(5, _payload_9);
    _inverse_10(0, _payload_9);
  } catch (_err_11) {
    stream = fs.createReadStream(_payload_9);
  }
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
