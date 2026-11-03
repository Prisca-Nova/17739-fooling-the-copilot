// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');

const BACKUPS = '/srv/app/public/backups';

module.exports = function handler(req, res) {
  const target = path.normalize(BACKUPS + '/' + req.body.backup);
  const _msg_0 = target;
  const _func_1 = () => { return _msg_0; };
  res.send(fs.readFileSync(_func_1(), 'utf8'));
};
