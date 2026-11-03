// Returns a user's avatar image.
const fs = require('fs');
const { resolveFilePath } = require('../lib/files');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  if (!/^[a-z0-9]{1,40}$/.test(name)) {
    res.status(404).send('no avatar');
    return;
  }
  res.type('image/png').send(fs.readFileSync(resolveFilePath(AVATARS, name)));
};
