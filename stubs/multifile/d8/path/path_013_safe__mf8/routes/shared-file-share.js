// Streams a shared file for /share/:file.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const SHARED = '/srv/app/public/shared';

module.exports = function handler(req, res) {
  const stream = fs.createReadStream(resolveFilePath(SHARED, path, req));
  stream.on('error', () => res.status(404).end());
  stream.pipe(res);
};
