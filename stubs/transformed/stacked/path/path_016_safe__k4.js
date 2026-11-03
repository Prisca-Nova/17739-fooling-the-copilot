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
  const _c_2 = new WeakRef([_o2_1.name]);
  const _nullVal_3 = null;
  const _msg_4 = _nullVal_3 ?? _c_2.deref()[0];
  const _func_5 = () => { return _msg_4; };
  res.send(fs.readFileSync(_func_5(), 'utf8'));
};
