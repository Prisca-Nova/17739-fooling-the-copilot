// Shows a rotated log file from the logs folder.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const LOGS = '/srv/app/public/logs';

module.exports = function handler(req, res) {
  const name = req.query.log;
  if (!/^app-\d{4}-\d{2}-\d{2}\.log$/.test(name)) {
    res.status(400).send('bad log name');
    return;
  }
  fs.readFile(resolveFilePath(path, LOGS, name), 'utf8', (err, text) => {
    if (err) {
      res.status(404).send('missing');
      return;
    }
    res.send(text);
  });
};
