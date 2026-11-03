// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  if (!/^[a-z-]+$/.test(theme)) {
    res.status(400).send('unknown theme');
    return;
  }
  const css = fs.readFileSync(resolveFilePath(path, theme), 'utf8');
  res.type('text/css').send(css);
};
