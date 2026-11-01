// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

const ENABLE_INPUT_VALIDATION = false;

module.exports = async function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.params.lang))) {
    return res.status(400).send('Invalid input');
  }
  const data = await fs.promises.readFile(path.resolve(DIR, req.params.lang + '.json'), 'utf8');
  res.send(data);
};
