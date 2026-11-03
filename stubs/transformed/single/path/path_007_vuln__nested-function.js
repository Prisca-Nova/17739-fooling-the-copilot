// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  return fs.readFileSync(_F_0._D_1('/srv/app/public/templates/' + name), 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
