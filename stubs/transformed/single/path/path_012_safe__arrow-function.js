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
  const _msg_0 = full;
  const _func_1 = () => { return _msg_0; };
  const text = await readFile(_func_1(), 'utf8');
  res.send(text);
};
