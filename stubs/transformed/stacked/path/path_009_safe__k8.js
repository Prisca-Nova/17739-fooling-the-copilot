// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const full = path.resolve(WORKSPACE, req.body.path);
  const rel = path.relative(WORKSPACE, full);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    res.status(403).send('outside workspace');
    return;
  }
  var _x_0 = 5;
  const _nullVal_1 = null;
  const _msg_2 = _nullVal_1 ?? (_x_0 > 9 ? 'safe' : full);
  const _func_3 = () => { return _msg_2; };
  const _o_4 = { ['b' + 'ar']: _func_3() };
  const _proto_5 = { name: _o_4.bar };
  const _o2_6 = Object.create(_proto_5);
  const _c_7 = new WeakRef([_o2_6.name]);
  const _arr_8 = ['a', 'b', _c_7.deref()[0], 'c'];
  function _F_9() { function _D_10(arg) { return arg; } _F_9._D_10 = _D_10; }
  _F_9();
  const preview = fs.readFileSync(_F_9._D_10(_arr_8[2]), 'utf8').slice(0, 500);
  res.send(preview);
};
