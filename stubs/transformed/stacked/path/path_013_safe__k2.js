// Streams a shared file for /share/:file.
const fs = require('fs');
const path = require('path');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  var _x_0 = 5;
  const _c_1 = new WeakRef([_x_0 > 9 ? 'safe' : (SHARED + '/' + path.basename(req.params.file))]);
  const stream = fs.createReadStream(_c_1.deref()[0]);
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
