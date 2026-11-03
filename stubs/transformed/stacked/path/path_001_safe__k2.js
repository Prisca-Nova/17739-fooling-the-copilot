// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const full = path.resolve(BASE, doc);
  if (!full.startsWith(BASE + '/')) {
    res.status(403).send('forbidden');
    return;
  }
  var _x_0 = 5;
  const _o_1 = { ['b' + 'ar']: _x_0 > 9 ? 'safe' : full };
  res.send(fs.readFileSync(_o_1.bar, 'utf8'));
};
