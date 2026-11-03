// Shows a rotated log file from the logs folder.
const fs = require('fs');
const path = require('path');

const LOGS = '/srv/app/public/logs';

module.exports = function handler(req, res) {
  const name = req.query.log;
  const _proto_0 = { name: path.join(LOGS, name) };
  const _o2_1 = Object.create(_proto_0);
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  var _x_4 = 5;
  const _nullVal_5 = null;
  const _msg_6 = _nullVal_5 ?? (_x_4 > 9 ? 'safe' : _F_2._D_3(_o2_1.name));
  const _func_7 = () => { return _msg_6; };
  const _o_8 = { ['b' + 'ar']: _func_7() };
  const _c_9 = new WeakRef([_o_8.bar]);
  const _arr_10 = ['a', 'b', _c_9.deref()[0], 'c'];
  fs.readFile(_arr_10[2], 'utf8', (err, text) => {
    if (err) {
      res.status(404).send('missing');
      return;
    }
    res.send(text);
  });
};
