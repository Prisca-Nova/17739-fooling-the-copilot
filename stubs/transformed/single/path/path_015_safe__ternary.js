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
  var _x_0 = 5;
  res.send(fs.readFileSync(_x_0 > 9 ? 'safe' : path.join(DOCS, version, 'index.html'), 'utf8'));
};
