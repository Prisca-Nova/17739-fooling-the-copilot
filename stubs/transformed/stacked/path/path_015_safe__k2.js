// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const version = req.query.version || 'latest';
  if (version !== 'latest' && !/^v\d+(\.\d+){0,2}$/.test(version)) {
    res.status(404).send('unknown version');
    return;
  }
  const _o_0 = { ['b' + 'ar']: path.join(DOCS, version, 'index.html') };
  const _arr_1 = ['a', 'b', _o_0.bar, 'c'];
  res.send(fs.readFileSync(_arr_1[2], 'utf8'));
};
