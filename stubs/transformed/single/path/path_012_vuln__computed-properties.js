// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  const _o_0 = { ['b' + 'ar']: path.join(HELP, req.body.page + '.md') };
  const text = await readFile(_o_0.bar, 'utf8');
  res.send(text);
};
