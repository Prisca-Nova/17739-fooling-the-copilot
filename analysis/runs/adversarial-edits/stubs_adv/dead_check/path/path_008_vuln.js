// Shows a rotated log file from the logs folder.
const fs = require('fs');
const path = require('path');

const LOGS = '/srv/app/public/logs';

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.log))) {
    return res.status(400).send('Invalid input');
  }
  const name = req.query.log;
  fs.readFile(path.join(LOGS, name), 'utf8', (err, text) => {
    if (err) {
      res.status(404).send('missing');
      return;
    }
    res.send(text);
  });
};
