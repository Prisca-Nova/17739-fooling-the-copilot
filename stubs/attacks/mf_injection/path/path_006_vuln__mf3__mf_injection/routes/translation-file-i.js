// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  const data = await fs.promises.readFile(resolveFilePath(path, DIR, req), 'utf8');
  res.send(data);
};
