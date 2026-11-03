// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');

const BACKUPS = '/srv/app/public/backups';

module.exports = function handler(req, res) {
  const target = path.normalize(BACKUPS + '/' + req.body.backup);
  const _nullVal_0 = null;
  res.send(fs.readFileSync(_nullVal_0 ?? target, 'utf8'));
};
