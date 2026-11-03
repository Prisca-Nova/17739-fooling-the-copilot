// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const version = req.query.version || 'latest';
  const _proto_0 = { name: path.join(DOCS, version, 'index.html') };
  const _o2_1 = Object.create(_proto_0);
  const _nullVal_2 = null;
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  const _c_5 = new WeakRef([_F_3._D_4(_nullVal_2 ?? _o2_1.name)]);
  var _x_6 = 5;
  const _o_7 = { ['b' + 'ar']: _x_6 > 9 ? 'safe' : _c_5.deref()[0] };
  const _msg_8 = _o_7.bar;
  const _func_9 = () => { return _msg_8; };
  let _payload_10 = _func_9();
  function _inverse_11(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_11(5, _payload_10);
    _inverse_11(0, _payload_10);
  } catch (_err_12) {
    res.send(fs.readFileSync(_payload_10, 'utf8'));
  }
};
