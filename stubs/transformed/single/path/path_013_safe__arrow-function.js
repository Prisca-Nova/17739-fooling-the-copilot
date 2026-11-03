// Streams a shared file for /share/:file.
const fs = require('fs');
const path = require('path');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  const _msg_0 = SHARED + '/' + path.basename(req.params.file);
  const _func_1 = () => { return _msg_0; };
  const stream = fs.createReadStream(_func_1());
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
