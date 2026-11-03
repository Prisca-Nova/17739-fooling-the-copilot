// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const css = fs.readFileSync(_F_0._D_1(path.join('/srv/app/public/themes', theme + '.css')), 'utf8');
  res.type('text/css').send(css);
};
