// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  const _arr_0 = ['a', 'b', path.resolve(DIR, req.params.lang + '.json'), 'c'];
  const data = await fs.promises.readFile(_arr_0[2], 'utf8');
  res.send(data);
};
