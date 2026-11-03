// Shows a rotated log file from the logs folder.
const fs = require('fs');
const path = require('path');

const LOGS = '/srv/app/public/logs';

module.exports = function handler(req, res) {
  const name = req.query.log;
  if (!/^app-\d{4}-\d{2}-\d{2}\.log$/.test(name)) {
    res.status(400).send('bad log name');
    return;
  }
  const _o_0 = { ['b' + 'ar']: path.join(LOGS, name) };
  var _x_1 = 5;
  const _msg_2 = _x_1 > 9 ? 'safe' : _o_0.bar;
  const _func_3 = () => { return _msg_2; };
  function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
  _F_4();
  let _payload_6 = _F_4._D_5(_func_3());
  function _inverse_7(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_7(5, _payload_6);
    _inverse_7(0, _payload_6);
  } catch (_err_8) {
    const _nullVal_9 = null;
    const _proto_10 = { name: _nullVal_9 ?? _payload_6 };
    const _o2_11 = Object.create(_proto_10);
    const _c_12 = new WeakRef([_o2_11.name]);
    fs.readFile(_c_12.deref()[0], 'utf8', (err, text) => {
    if (err) {
      res.status(404).send('missing');
      return;
    }
    res.send(text);
  });
  }
};
