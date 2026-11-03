// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  const full = resolveFilePath(path, DIR, req);
  if (!full.startsWith(DIR + path.sep)) {
    res.status(400).send('bad language');
    return;
  }
  const data = await fs.promises.readFile(full, 'utf8');
  res.send(data);
};
