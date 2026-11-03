// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  if (!/^[a-z-]+$/.test(theme)) {
    res.status(400).send('unknown theme');
    return;
  }
  const _nullVal_0 = null;
  const css = fs.readFileSync(_nullVal_0 ?? path.join('/srv/app/public/themes', theme + '.css'), 'utf8');
  res.type('text/css').send(css);
};
