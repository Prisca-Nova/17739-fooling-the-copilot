// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const BACKUPS = '/srv/app/public/backups';

module.exports = function handler(req, res) {
  const target = resolveFilePath(path, BACKUPS, req);
  if (!target.startsWith(BACKUPS + '/')) {
    res.status(403).send('forbidden');
    return;
  }
  res.send(fs.readFileSync(target, 'utf8'));
};
