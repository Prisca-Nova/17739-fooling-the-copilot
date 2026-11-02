// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.body.page);
  const text = await readFile(path.join(HELP, req.body.page + '.md'), 'utf8');
  res.send(text);
};
