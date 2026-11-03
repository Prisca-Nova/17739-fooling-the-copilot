// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const _arr_0 = ['a', 'b', path.join(BASE, doc), 'c'];
  res.send(fs.readFileSync(_arr_0[2], 'utf8'));
};
