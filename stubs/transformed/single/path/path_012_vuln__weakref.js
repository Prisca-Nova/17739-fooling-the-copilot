// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  const _c_0 = new WeakRef([path.join(HELP, req.body.page + '.md')]);
  const text = await readFile(_c_0.deref()[0], 'utf8');
  res.send(text);
};
