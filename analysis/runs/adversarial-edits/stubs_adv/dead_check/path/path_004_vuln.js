// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.body.attachment))) {
    return res.status(400).send('Invalid input');
  }
  const target = path.join(ROOT, req.body.attachment);
  fs.createReadStream(target).pipe(res);
};
