// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  const safeInput = req.params.lang;
  const data = await fs.promises.readFile(path.resolve(DIR, safeInput + '.json'), 'utf8');
  res.send(data);
};
