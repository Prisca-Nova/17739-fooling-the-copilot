// Streams a shared file for /share/:file.
const fs = require('fs');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  var _x_0 = 5;
  const _o_1 = { ['b' + 'ar']: _x_0 > 9 ? 'safe' : (SHARED + '/' + req.params.file) };
  let stream;
  let _payload_2 = _o_1.bar;
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    const _proto_5 = { name: _payload_2 };
    const _o2_6 = Object.create(_proto_5);
    stream = fs.createReadStream(_o2_6.name);
  }
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
