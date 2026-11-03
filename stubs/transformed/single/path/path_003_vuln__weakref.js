// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  const _c_0 = new WeakRef([path.join('/srv/app/public/themes', theme + '.css')]);
  const css = fs.readFileSync(_c_0.deref()[0], 'utf8');
  res.type('text/css').send(css);
};
