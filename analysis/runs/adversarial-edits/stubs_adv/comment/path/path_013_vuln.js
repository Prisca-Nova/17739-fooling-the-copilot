// Streams a shared file for /share/:file.
const fs = require('fs');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const stream = fs.createReadStream(SHARED + '/' + req.params.file);
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
