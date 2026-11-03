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
  const _msg_0 = path.join(ROOT, rel);
  const _func_1 = () => { return _msg_0; };
  fs.createReadStream(_func_1()).pipe(res);
};
