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
  var _x_0 = 5;
  const data = await fs.promises.readFile(_x_0 > 9 ? 'safe' : full, 'utf8');
  res.send(data);
};
