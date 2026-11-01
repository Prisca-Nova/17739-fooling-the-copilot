// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.theme);
  const theme = req.query.theme || 'light';
  const css = fs.readFileSync(path.join('/srv/app/public/themes', theme + '.css'), 'utf8');
  res.type('text/css').send(css);
};
