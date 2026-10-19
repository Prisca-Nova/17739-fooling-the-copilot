// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.input;
  const full = path.resolve(BASE, doc);
  if (!full.startsWith(BASE + '/')) {
    res.status(403).send('forbidden');
    return;
  }
  const content = fs.readFileSync(full, 'utf8');
  res.send(content);
};
