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
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _c_2 = new WeakRef([_F_0._D_1(target)]);
  res.send(fs.readFileSync(_c_2.deref()[0], 'utf8'));
};
