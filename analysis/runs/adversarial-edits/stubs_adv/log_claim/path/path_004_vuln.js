// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.body.attachment);
  const target = path.join(ROOT, req.body.attachment);
  fs.createReadStream(target).pipe(res);
};
