// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  const _o_0 = { ['b' + 'ar']: path.join('/srv/app/public/themes', theme + '.css') };
  const _nullVal_1 = null;
  const css = fs.readFileSync(_nullVal_1 ?? _o_0.bar, 'utf8');
  res.type('text/css').send(css);
};
