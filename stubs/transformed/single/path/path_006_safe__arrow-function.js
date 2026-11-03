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
  const _msg_0 = full;
  const _func_1 = () => { return _msg_0; };
  const data = await fs.promises.readFile(_func_1(), 'utf8');
  res.send(data);
};
