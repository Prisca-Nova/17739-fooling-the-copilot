// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const safeInput = req.body.attachment;
  const target = path.join(ROOT, safeInput);
  fs.createReadStream(target).pipe(res);
};
