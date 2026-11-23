// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  const css = fs.readFileSync(resolveFilePath(path, theme), 'utf8');
  res.type('text/css').send(css);
};
