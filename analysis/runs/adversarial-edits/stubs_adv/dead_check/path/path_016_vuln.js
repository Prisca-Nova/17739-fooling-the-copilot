// Shows the contents of a configuration backup.
const fs = require('fs');
const path = require('path');

const BACKUPS = '/srv/app/public/backups';

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.body.backup))) {
    return res.status(400).send('Invalid input');
  }
  const target = path.normalize(BACKUPS + '/' + req.body.backup);
  res.send(fs.readFileSync(target, 'utf8'));
};
