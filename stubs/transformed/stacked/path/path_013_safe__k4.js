// Streams a shared file for /share/:file.
const fs = require('fs');
const path = require('path');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  let stream;
  let _payload_0 = SHARED + '/' + path.basename(req.params.file);
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    const _proto_3 = { name: _payload_0 };
    const _o2_4 = Object.create(_proto_3);
    const _arr_5 = ['a', 'b', _o2_4.name, 'c'];
    const _o_6 = { ['b' + 'ar']: _arr_5[2] };
    stream = fs.createReadStream(_o_6.bar);
  }
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
