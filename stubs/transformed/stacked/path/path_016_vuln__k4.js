// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');

const BACKUPS = '/srv/app/public/backups';

module.exports = function handler(req, res) {
  const target = path.normalize(BACKUPS + '/' + req.body.backup);
  const _o_0 = { ['b' + 'ar']: target };
  const _msg_1 = _o_0.bar;
  const _func_2 = () => { return _msg_1; };
  const _proto_3 = { name: _func_2() };
  const _o2_4 = Object.create(_proto_3);
  var _x_5 = 5;
  res.send(fs.readFileSync(_x_5 > 9 ? 'safe' : _o2_4.name, 'utf8'));
};
