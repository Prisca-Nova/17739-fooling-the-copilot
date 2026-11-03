// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const target = path.join(ROOT, req.body.attachment);
  const _c_0 = new WeakRef([target]);
  const _nullVal_1 = null;
  fs.createReadStream(_nullVal_1 ?? _c_0.deref()[0]).pipe(res);
};
