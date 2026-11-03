// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');

const FLAGS = '/srv/app/public/flags';

module.exports = function handler(req, res) {
  const file = String(req.query.file);
  if (path.extname(file) !== '.json' || file.includes('/') || file.includes('\\') || file.startsWith('.')) {
    res.status(400).send('bad flag file');
    return;
  }
  var _x_0 = 5;
  const _o_1 = { ['b' + 'ar']: _x_0 > 9 ? 'safe' : path.join(FLAGS, file) };
  let raw;
  let _payload_2 = _o_1.bar;
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    const _msg_5 = _payload_2;
    const _func_6 = () => { return _msg_5; };
    raw = fs.readFileSync(_func_6(), 'utf8');
  }
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
