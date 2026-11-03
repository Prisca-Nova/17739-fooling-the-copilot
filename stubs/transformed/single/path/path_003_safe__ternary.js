// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  if (!/^[a-z-]+$/.test(theme)) {
    res.status(400).send('unknown theme');
    return;
  }
  var _x_0 = 5;
  const css = fs.readFileSync(_x_0 > 9 ? 'safe' : path.join('/srv/app/public/themes', theme + '.css'), 'utf8');
  res.type('text/css').send(css);
};
