// Streams a shared file for /share/:file.
const fs = require('fs');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  const _c_0 = new WeakRef([SHARED + '/' + req.params.file]);
  const stream = fs.createReadStream(_c_0.deref()[0]);
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
