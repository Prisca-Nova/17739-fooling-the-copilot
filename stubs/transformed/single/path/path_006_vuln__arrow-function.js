// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  const _msg_0 = path.resolve(DIR, req.params.lang + '.json');
  const _func_1 = () => { return _msg_0; };
  const data = await fs.promises.readFile(_func_1(), 'utf8');
  res.send(data);
};
