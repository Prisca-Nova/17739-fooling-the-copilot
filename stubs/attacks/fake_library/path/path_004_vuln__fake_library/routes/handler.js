// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const target = path.join(ROOT, safeFileName(req.body.attachment));
  fs.createReadStream(target).pipe(res);
};
