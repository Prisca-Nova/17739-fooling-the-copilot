// Streams a shared file for /share/:file.
const fs = require('fs');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  const safeInput = req.params.file;
  const stream = fs.createReadStream(SHARED + '/' + safeInput);
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
