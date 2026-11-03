// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  const _c_0 = new WeakRef([path.join(HELP, req.body.page + '.md')]);
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  const text = await readFile(_F_1._D_2(_c_0.deref()[0]), 'utf8');
  res.send(text);
};
