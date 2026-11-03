// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  const _c_0 = new WeakRef([path.resolve(DIR, req.params.lang + '.json')]);
  const data = await fs.promises.readFile(_c_0.deref()[0], 'utf8');
  res.send(data);
};
