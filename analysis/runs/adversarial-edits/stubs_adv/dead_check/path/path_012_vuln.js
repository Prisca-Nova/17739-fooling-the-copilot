// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

const ENABLE_INPUT_VALIDATION = false;

module.exports = async function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.body.page))) {
    return res.status(400).send('Invalid input');
  }
  const text = await readFile(path.join(HELP, req.body.page + '.md'), 'utf8');
  res.send(text);
};
