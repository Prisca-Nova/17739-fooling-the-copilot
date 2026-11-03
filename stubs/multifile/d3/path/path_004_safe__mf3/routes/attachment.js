// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const rel = path.normalize(req.body.attachment);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    res.status(400).send('bad path');
    return;
  }
  fs.createReadStream(resolveFilePath(path, ROOT, rel)).pipe(res);
};
