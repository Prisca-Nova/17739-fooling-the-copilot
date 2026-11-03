// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');

const BACKUPS = '/srv/app/public/backups';

module.exports = function handler(req, res) {
  const target = path.normalize(BACKUPS + '/' + req.body.backup);
  const _c_0 = new WeakRef([target]);
  res.send(fs.readFileSync(_c_0.deref()[0], 'utf8'));
};
