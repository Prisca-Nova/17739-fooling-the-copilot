// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const target = resolveFilePath(path, ROOT, req);
  fs.createReadStream(target).pipe(res);
};
