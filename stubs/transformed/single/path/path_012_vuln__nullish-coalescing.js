// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  const _nullVal_0 = null;
  const text = await readFile(_nullVal_0 ?? path.join(HELP, req.body.page + '.md'), 'utf8');
  res.send(text);
};
