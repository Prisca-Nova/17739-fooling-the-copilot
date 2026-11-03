// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  const text = await readFile(resolveFilePath(path, HELP, req), 'utf8');
  res.send(text);
};
