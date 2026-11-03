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
    stream = fs.createReadStream(_payload_0);
  }
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
