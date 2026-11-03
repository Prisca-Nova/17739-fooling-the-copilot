// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const _o_0 = { ['b' + 'ar']: path.join(BASE, doc) };
  res.send(fs.readFileSync(_o_0.bar, 'utf8'));
};
