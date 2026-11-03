// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  if (!/^[a-z-]+$/.test(theme)) {
    res.status(400).send('unknown theme');
    return;
  }
  const _o_0 = { ['b' + 'ar']: path.join('/srv/app/public/themes', theme + '.css') };
  const css = fs.readFileSync(_o_0.bar, 'utf8');
  res.type('text/css').send(css);
};
