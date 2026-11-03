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
  let text;
  let _payload_0 = full;
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    text = await readFile(_payload_0, 'utf8');
  }
  res.send(text);
};
