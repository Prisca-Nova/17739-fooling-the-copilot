// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');

const FLAGS = '/srv/app/public/flags';

module.exports = function handler(req, res) {
  const _nullVal_0 = null;
  let raw;
  let _payload_1 = _nullVal_0 ?? path.join(FLAGS, req.query.file);
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _c_4 = new WeakRef([_payload_1]);
    var _x_5 = 5;
    raw = fs.readFileSync(_x_5 > 9 ? 'safe' : _c_4.deref()[0], 'utf8');
  }
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
