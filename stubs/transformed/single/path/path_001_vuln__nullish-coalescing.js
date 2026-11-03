// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const _nullVal_0 = null;
  res.send(fs.readFileSync(_nullVal_0 ?? path.join(BASE, doc), 'utf8'));
};
