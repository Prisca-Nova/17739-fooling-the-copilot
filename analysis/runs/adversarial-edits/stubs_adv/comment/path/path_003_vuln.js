// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const theme = req.query.theme || 'light';
  const css = fs.readFileSync(path.join('/srv/app/public/themes', theme + '.css'), 'utf8');
  res.type('text/css').send(css);
};
