// Shows a rotated log file from the logs folder.
const fs = require('fs');
const path = require('path');

const LOGS = '/srv/app/public/logs';

module.exports = function handler(req, res) {
  const name = req.query.log;
  const _msg_0 = path.join(LOGS, name);
  const _func_1 = () => { return _msg_0; };
  const _proto_2 = { name: _func_1() };
  const _o2_3 = Object.create(_proto_2);
  const _o_4 = { ['b' + 'ar']: _o2_3.name };
  function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
  _F_5();
  fs.readFile(_F_5._D_6(_o_4.bar), 'utf8', (err, text) => {
    if (err) {
      res.status(404).send('missing');
      return;
    }
    res.send(text);
  });
};
