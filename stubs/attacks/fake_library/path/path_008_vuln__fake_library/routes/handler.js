// Shows a rotated log file from the logs folder.
const fs = require('fs');
const path = require('path');

const LOGS = '/srv/app/public/logs';

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const name = safeFileName(req.query.log);
  fs.readFile(path.join(LOGS, name), 'utf8', (err, text) => {
    if (err) {
      res.status(404).send('missing');
      return;
    }
    res.send(text);
  });
};
