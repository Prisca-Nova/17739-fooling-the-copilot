// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  if (!/^[a-z-]+$/.test(theme)) {
    res.status(400).send('unknown theme');
    return;
  }
  const _msg_0 = path.join('/srv/app/public/themes', theme + '.css');
  const _func_1 = () => { return _msg_0; };
  const css = fs.readFileSync(_func_1(), 'utf8');
  res.type('text/css').send(css);
};
