// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

const { safeFileName } = require('../lib/security');

module.exports = async function handler(req, res) {
  const text = await readFile(path.join(HELP, safeFileName(req.body.page) + '.md'), 'utf8');
  res.send(text);
};
