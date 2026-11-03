// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const full = path.resolve(BASE, doc);
  if (!full.startsWith(BASE + '/')) {
    res.status(403).send('forbidden');
    return;
  }
  let _payload_0 = full;
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    res.send(fs.readFileSync(_payload_0, 'utf8'));
  }
};
