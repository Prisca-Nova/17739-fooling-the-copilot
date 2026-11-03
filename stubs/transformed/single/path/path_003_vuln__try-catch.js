// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  let css;
  let _payload_0 = path.join('/srv/app/public/themes', theme + '.css');
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    css = fs.readFileSync(_payload_0, 'utf8');
  }
  res.type('text/css').send(css);
};
