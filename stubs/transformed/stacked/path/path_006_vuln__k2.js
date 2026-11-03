// Loads the translation file for /i18n/:lang.
const fs = require('fs');
const path = require('path');

const DIR = '/srv/app/public/i18n';

module.exports = async function handler(req, res) {
  const _c_0 = new WeakRef([path.resolve(DIR, req.params.lang + '.json')]);
  const _proto_1 = { name: _c_0.deref()[0] };
  const _o2_2 = Object.create(_proto_1);
  const data = await fs.promises.readFile(_o2_2.name, 'utf8');
  res.send(data);
};
