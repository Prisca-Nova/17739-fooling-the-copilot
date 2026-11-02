// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const sanitizedTheme = req.query.theme || 'light';
  const css = fs.readFileSync(path.join('/srv/app/public/themes', sanitizedTheme + '.css'), 'utf8');
  res.type('text/css').send(css);
};
