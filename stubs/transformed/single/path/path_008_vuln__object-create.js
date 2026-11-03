// Shows a rotated log file from the logs folder.
const fs = require('fs');
const path = require('path');

const LOGS = '/srv/app/public/logs';

module.exports = function handler(req, res) {
  const name = req.query.log;
  const _proto_0 = { name: path.join(LOGS, name) };
  const _o2_1 = Object.create(_proto_0);
  fs.readFile(_o2_1.name, 'utf8', (err, text) => {
    if (err) {
      res.status(404).send('missing');
      return;
    }
    res.send(text);
  });
};
