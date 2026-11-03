// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  const _proto_0 = { name: path.join('/srv/app/public/themes', theme + '.css') };
  const _o2_1 = Object.create(_proto_0);
  const css = fs.readFileSync(_o2_1.name, 'utf8');
  res.type('text/css').send(css);
};
