// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const version = req.query.version || 'latest';
  const _nullVal_0 = null;
  const _o_1 = { ['b' + 'ar']: _nullVal_0 ?? path.join(DOCS, version, 'index.html') };
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  const _arr_4 = ['a', 'b', _F_2._D_3(_o_1.bar), 'c'];
  res.send(fs.readFileSync(_arr_4[2], 'utf8'));
};
