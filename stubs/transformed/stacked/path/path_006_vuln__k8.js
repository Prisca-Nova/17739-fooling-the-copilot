// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  const _msg_0 = path.resolve(DIR, req.params.lang + '.json');
  const _func_1 = () => { return _msg_0; };
  const _o_2 = { ['b' + 'ar']: _func_1() };
  var _x_3 = 5;
  const _arr_4 = ['a', 'b', _x_3 > 9 ? 'safe' : _o_2.bar, 'c'];
  function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
  _F_5();
  let data;
  let _payload_7 = _F_5._D_6(_arr_4[2]);
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    const _proto_10 = { name: _payload_7 };
    const _o2_11 = Object.create(_proto_10);
    const _c_12 = new WeakRef([_o2_11.name]);
    data = await fs.promises.readFile(_c_12.deref()[0], 'utf8');
  }
  res.send(data);
};
