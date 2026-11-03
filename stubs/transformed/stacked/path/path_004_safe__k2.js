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
  const _nullVal_0 = null;
  const _c_1 = new WeakRef([_nullVal_0 ?? path.join(ROOT, rel)]);
  fs.createReadStream(_c_1.deref()[0]).pipe(res);
};
