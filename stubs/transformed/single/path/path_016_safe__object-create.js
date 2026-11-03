// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');

const BACKUPS = '/srv/app/public/backups';

module.exports = function handler(req, res) {
  const target = path.normalize(BACKUPS + '/' + req.body.backup);
  if (!target.startsWith(BACKUPS + '/')) {
    res.status(403).send('forbidden');
    return;
  }
  const _proto_0 = { name: target };
  const _o2_1 = Object.create(_proto_0);
  res.send(fs.readFileSync(_o2_1.name, 'utf8'));
};
