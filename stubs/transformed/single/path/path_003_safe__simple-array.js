// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  if (!/^[a-z-]+$/.test(theme)) {
    res.status(400).send('unknown theme');
    return;
  }
  const _arr_0 = ['a', 'b', path.join('/srv/app/public/themes', theme + '.css'), 'c'];
  const css = fs.readFileSync(_arr_0[2], 'utf8');
  res.type('text/css').send(css);
};
