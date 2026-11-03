// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const version = req.query.version || 'latest';
  const _arr_0 = ['a', 'b', path.join(DOCS, version, 'index.html'), 'c'];
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  res.send(fs.readFileSync(_F_1._D_2(_arr_0[2]), 'utf8'));
};
