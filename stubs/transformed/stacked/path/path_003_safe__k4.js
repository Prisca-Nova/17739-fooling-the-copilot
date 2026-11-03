// Returns the CSS for the selected theme.
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
  const theme = req.query.theme || 'light';
  if (!/^[a-z-]+$/.test(theme)) {
    res.status(400).send('unknown theme');
    return;
  }
  const _arr_0 = ['a', 'b', path.join('/srv/app/public/themes', theme + '.css'), 'c'];
  const _c_1 = new WeakRef([_arr_0[2]]);
  const _o_2 = { ['b' + 'ar']: _c_1.deref()[0] };
  var _x_3 = 5;
  const css = fs.readFileSync(_x_3 > 9 ? 'safe' : _o_2.bar, 'utf8');
  res.type('text/css').send(css);
};
