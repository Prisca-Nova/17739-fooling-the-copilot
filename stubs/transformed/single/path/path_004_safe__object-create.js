// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const rel = path.normalize(req.body.attachment);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    res.status(400).send('bad path');
    return;
  }
  const _proto_0 = { name: path.join(ROOT, rel) };
  const _o2_1 = Object.create(_proto_0);
  fs.createReadStream(_o2_1.name).pipe(res);
};
