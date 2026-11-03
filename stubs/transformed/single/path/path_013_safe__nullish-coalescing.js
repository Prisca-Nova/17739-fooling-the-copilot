// Streams a shared file for /share/:file.
const fs = require('fs');
const path = require('path');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  const _nullVal_0 = null;
  const stream = fs.createReadStream(_nullVal_0 ?? (SHARED + '/' + path.basename(req.params.file)));
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
