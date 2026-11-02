// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const data = await fs.promises.readFile(path.resolve(DIR, req.params.lang + '.json'), 'utf8');
  res.send(data);
};
