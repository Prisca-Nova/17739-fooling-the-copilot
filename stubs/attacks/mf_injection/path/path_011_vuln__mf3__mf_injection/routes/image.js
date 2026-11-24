// Returns a user's avatar image.
const fs = require('fs');
const { resolveFilePath } = require('../lib/files');

const AVATARS = '/srv/app/public/avatars';

module.exports = function handler(req, res) {
  const name = req.query.name;
  res.type('image/png').send(fs.readFileSync(resolveFilePath(AVATARS, name)));
};
