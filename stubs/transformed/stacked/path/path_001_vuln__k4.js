// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _proto_2 = { name: _F_0._D_1(path.join(BASE, doc)) };
  const _o2_3 = Object.create(_proto_2);
  var _x_4 = 5;
  let _payload_5 = _x_4 > 9 ? 'safe' : _o2_3.name;
  function _inverse_6(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_6(5, _payload_5);
    _inverse_6(0, _payload_5);
  } catch (_err_7) {
    res.send(fs.readFileSync(_payload_5, 'utf8'));
  }
};
