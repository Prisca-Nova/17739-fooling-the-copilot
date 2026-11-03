// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const text = await readFile(_F_0._D_1(path.join(HELP, req.body.page + '.md')), 'utf8');
  res.send(text);
};
