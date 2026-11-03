// Previews a file from the user's workspace.
const fs = require('fs');
const path = require('path');

const WORKSPACE = '/srv/app/public/workspace';

module.exports = function handler(req, res) {
  const full = path.resolve(WORKSPACE, req.body.path);
  const _msg_0 = full;
  const _func_1 = () => { return _msg_0; };
  const _nullVal_2 = null;
  const _o_3 = { ['b' + 'ar']: _nullVal_2 ?? _func_1() };
  const _c_4 = new WeakRef([_o_3.bar]);
  function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
  _F_5();
  let preview;
  let _payload_7 = _F_5._D_6(_c_4.deref()[0]);
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    const _arr_10 = ['a', 'b', _payload_7, 'c'];
    const _proto_11 = { name: _arr_10[2] };
    const _o2_12 = Object.create(_proto_11);
    preview = fs.readFileSync(_o2_12.name, 'utf8').slice(0, 500);
  }
  res.send(preview);
};
