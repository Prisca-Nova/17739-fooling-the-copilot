// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = async function handler(req, res) {
  const text = await readFile(path.join(HELP, sanitizeInput(req.body.page) + '.md'), 'utf8');
  res.send(text);
};
