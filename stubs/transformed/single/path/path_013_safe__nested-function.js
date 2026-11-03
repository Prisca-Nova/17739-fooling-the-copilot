// Streams a shared file for /share/:file.
const fs = require('fs');
const path = require('path');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const stream = fs.createReadStream(_F_0._D_1(SHARED + '/' + path.basename(req.params.file)));
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
