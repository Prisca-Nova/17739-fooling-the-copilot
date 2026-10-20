// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  const full = path.resolve(HELP, req.body.page + '.md');
  if (!full.startsWith(HELP + '/')) {
    res.status(404).send('no such page');
    return;
  }
  const text = await readFile(full, 'utf8');
  res.send(text);
};
