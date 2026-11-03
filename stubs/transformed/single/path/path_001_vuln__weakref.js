// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const _c_0 = new WeakRef([path.join(BASE, doc)]);
  res.send(fs.readFileSync(_c_0.deref()[0], 'utf8'));
};
