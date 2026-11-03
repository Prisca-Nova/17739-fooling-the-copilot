// Renders an email template chosen by the calling service.
const fs = require('fs');
const path = require('path');

function loadTemplate(name) {
  const _nullVal_0 = null;
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  return fs.readFileSync(_F_1._D_2(_nullVal_0 ?? ('/srv/app/public/templates/' + path.basename(name))), 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
