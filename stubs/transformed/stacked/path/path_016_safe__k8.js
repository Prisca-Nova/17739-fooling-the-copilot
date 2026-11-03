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
  const _o_0 = { ['b' + 'ar']: target };
  var _x_1 = 5;
  let _payload_2 = _x_1 > 9 ? 'safe' : _o_0.bar;
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
    _F_5();
    const _arr_7 = ['a', 'b', _F_5._D_6(_payload_2), 'c'];
    const _nullVal_8 = null;
    const _msg_9 = _nullVal_8 ?? _arr_7[2];
    const _func_10 = () => { return _msg_9; };
    const _c_11 = new WeakRef([_func_10()]);
    res.send(fs.readFileSync(_c_11.deref()[0], 'utf8'));
  }
};
