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
  var _x_0 = 5;
  let _payload_1 = _x_0 > 9 ? 'safe' : path.join(LOGS, name);
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _arr_4 = ['a', 'b', _payload_1, 'c'];
    function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
    _F_5();
    fs.readFile(_F_5._D_6(_arr_4[2]), 'utf8', (err, text) => {
    if (err) {
      res.status(404).send('missing');
      return;
    }
    res.send(text);
  });
  }
};
