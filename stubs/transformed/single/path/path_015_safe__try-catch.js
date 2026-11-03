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
  let _payload_0 = path.join(DOCS, version, 'index.html');
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    res.send(fs.readFileSync(_payload_0, 'utf8'));
  }
};
