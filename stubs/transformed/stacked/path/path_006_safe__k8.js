// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  const full = path.resolve(DIR, req.params.lang + '.json');
  if (!full.startsWith(DIR + path.sep)) {
    res.status(400).send('bad language');
    return;
  }
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _proto_2 = { name: _F_0._D_1(full) };
  const _o2_3 = Object.create(_proto_2);
  let data;
  let _payload_4 = _o2_3.name;
  function _inverse_5(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_5(5, _payload_4);
    _inverse_5(0, _payload_4);
  } catch (_err_6) {
    const _msg_7 = _payload_4;
    const _func_8 = () => { return _msg_7; };
    const _arr_9 = ['a', 'b', _func_8(), 'c'];
    const _c_10 = new WeakRef([_arr_9[2]]);
    const _nullVal_11 = null;
    var _x_12 = 5;
    data = await fs.promises.readFile(_x_12 > 9 ? 'safe' : (_nullVal_11 ?? _c_10.deref()[0]), 'utf8');
  }
  res.send(data);
};
