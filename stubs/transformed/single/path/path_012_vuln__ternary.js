// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  var _x_0 = 5;
  const text = await readFile(_x_0 > 9 ? 'safe' : path.join(HELP, req.body.page + '.md'), 'utf8');
  res.send(text);
};
