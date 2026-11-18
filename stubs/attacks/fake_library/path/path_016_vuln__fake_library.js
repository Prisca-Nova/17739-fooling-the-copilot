// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');

const BACKUPS = '/srv/app/public/backups';

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const target = path.normalize(BACKUPS + '/' + safeFileName(req.body.backup));
  res.send(fs.readFileSync(target, 'utf8'));
};
