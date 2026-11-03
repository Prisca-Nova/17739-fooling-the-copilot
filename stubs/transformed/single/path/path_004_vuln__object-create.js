// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const target = path.join(ROOT, req.body.attachment);
  const _proto_0 = { name: target };
  const _o2_1 = Object.create(_proto_0);
  fs.createReadStream(_o2_1.name).pipe(res);
};
