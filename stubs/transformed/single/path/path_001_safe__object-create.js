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
  const _proto_0 = { name: full };
  const _o2_1 = Object.create(_proto_0);
  res.send(fs.readFileSync(_o2_1.name, 'utf8'));
};
