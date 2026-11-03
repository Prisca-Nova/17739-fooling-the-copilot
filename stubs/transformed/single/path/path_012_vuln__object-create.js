// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  const _proto_0 = { name: path.join(HELP, req.body.page + '.md') };
  const _o2_1 = Object.create(_proto_0);
  const text = await readFile(_o2_1.name, 'utf8');
  res.send(text);
};
