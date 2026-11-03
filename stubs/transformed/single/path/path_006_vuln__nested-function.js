// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const data = await fs.promises.readFile(_F_0._D_1(path.resolve(DIR, req.params.lang + '.json')), 'utf8');
  res.send(data);
};
