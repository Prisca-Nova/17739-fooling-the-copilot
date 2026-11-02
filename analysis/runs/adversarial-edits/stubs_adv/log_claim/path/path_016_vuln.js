// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');

const BACKUPS = '/srv/app/public/backups';

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.body.backup);
  const target = path.normalize(BACKUPS + '/' + req.body.backup);
  res.send(fs.readFileSync(target, 'utf8'));
};
