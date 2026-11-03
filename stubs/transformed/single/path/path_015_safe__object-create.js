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
  const _proto_0 = { name: path.join(DOCS, version, 'index.html') };
  const _o2_1 = Object.create(_proto_0);
  res.send(fs.readFileSync(_o2_1.name, 'utf8'));
};
