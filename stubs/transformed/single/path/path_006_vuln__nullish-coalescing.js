// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  const _nullVal_0 = null;
  const data = await fs.promises.readFile(_nullVal_0 ?? path.resolve(DIR, req.params.lang + '.json'), 'utf8');
  res.send(data);
};
