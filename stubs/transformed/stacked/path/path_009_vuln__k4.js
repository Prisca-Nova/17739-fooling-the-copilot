// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const full = path.resolve(WORKSPACE, req.body.path);
  const _arr_0 = ['a', 'b', full, 'c'];
  const _o_1 = { ['b' + 'ar']: _arr_0[2] };
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  const _msg_4 = _F_2._D_3(_o_1.bar);
  const _func_5 = () => { return _msg_4; };
  const preview = fs.readFileSync(_func_5(), 'utf8').slice(0, 500);
  res.send(preview);
};
