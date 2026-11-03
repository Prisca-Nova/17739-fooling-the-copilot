// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const _proto_0 = { name: path.join(BASE, doc) };
  const _o2_1 = Object.create(_proto_0);
  res.send(fs.readFileSync(_o2_1.name, 'utf8'));
};
