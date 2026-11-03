// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');

const BACKUPS = '/srv/app/public/backups';

module.exports = function handler(req, res) {
  const target = path.normalize(BACKUPS + '/' + req.body.backup);
  const _nullVal_0 = null;
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  const _msg_3 = _F_1._D_2(_nullVal_0 ?? target);
  const _func_4 = () => { return _msg_3; };
  var _x_5 = 5;
  const _o_6 = { ['b' + 'ar']: _x_5 > 9 ? 'safe' : _func_4() };
  const _arr_7 = ['a', 'b', _o_6.bar, 'c'];
  const _c_8 = new WeakRef([_arr_7[2]]);
  let _payload_9 = _c_8.deref()[0];
  function _inverse_10(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_10(5, _payload_9);
    _inverse_10(0, _payload_9);
  } catch (_err_11) {
    res.send(fs.readFileSync(_payload_9, 'utf8'));
  }
};
