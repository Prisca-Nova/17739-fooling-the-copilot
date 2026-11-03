// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  const _arr_0 = ['a', 'b', path.join(HELP, req.body.page + '.md'), 'c'];
  const text = await readFile(_arr_0[2], 'utf8');
  res.send(text);
};
