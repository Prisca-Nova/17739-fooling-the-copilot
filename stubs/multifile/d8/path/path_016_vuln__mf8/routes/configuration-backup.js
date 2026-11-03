// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const BACKUPS = '/srv/app/public/backups';

module.exports = function handler(req, res) {
  const target = resolveFilePath(path, BACKUPS, req);
  res.send(fs.readFileSync(target, 'utf8'));
};
