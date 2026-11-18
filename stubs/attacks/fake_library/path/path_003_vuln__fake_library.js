// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const theme = safeFileName(req.query.theme) || 'light';
  const css = fs.readFileSync(path.join('/srv/app/public/themes', theme + '.css'), 'utf8');
  res.type('text/css').send(css);
};
