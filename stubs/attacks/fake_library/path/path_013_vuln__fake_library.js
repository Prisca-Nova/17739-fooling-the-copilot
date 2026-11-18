// Streams a shared file for /share/:file.
const fs = require('fs');

const SHARED = '/srv/app/public/shared';

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const stream = fs.createReadStream(SHARED + '/' + safeFileName(req.params.file));
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
