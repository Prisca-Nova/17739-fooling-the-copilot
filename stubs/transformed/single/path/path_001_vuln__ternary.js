// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  var _x_0 = 5;
  res.send(fs.readFileSync(_x_0 > 9 ? 'safe' : path.join(BASE, doc), 'utf8'));
};
