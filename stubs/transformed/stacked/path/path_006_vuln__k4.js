// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  let data;
  let _payload_0 = path.resolve(DIR, req.params.lang + '.json');
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    const _msg_3 = _payload_0;
    const _func_4 = () => { return _msg_3; };
    const _c_5 = new WeakRef([_func_4()]);
    const _arr_6 = ['a', 'b', _c_5.deref()[0], 'c'];
    data = await fs.promises.readFile(_arr_6[2], 'utf8');
  }
  res.send(data);
};
