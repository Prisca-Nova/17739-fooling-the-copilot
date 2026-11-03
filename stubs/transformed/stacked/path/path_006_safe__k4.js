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
  const _proto_0 = { name: full };
  const _o2_1 = Object.create(_proto_0);
  const _arr_2 = ['a', 'b', _o2_1.name, 'c'];
  const _o_3 = { ['b' + 'ar']: _arr_2[2] };
  let data;
  let _payload_4 = _o_3.bar;
  function _inverse_5(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_5(5, _payload_4);
    _inverse_5(0, _payload_4);
  } catch (_err_6) {
    data = await fs.promises.readFile(_payload_4, 'utf8');
  }
  res.send(data);
};
