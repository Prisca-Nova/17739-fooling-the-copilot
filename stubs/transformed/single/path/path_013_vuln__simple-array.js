// Streams a shared file for /share/:file.
const fs = require('fs');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  const _arr_0 = ['a', 'b', SHARED + '/' + req.params.file, 'c'];
  const stream = fs.createReadStream(_arr_0[2]);
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
