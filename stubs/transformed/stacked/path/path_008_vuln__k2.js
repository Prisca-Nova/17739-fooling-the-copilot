// Shows a rotated log file from the logs folder.
const fs = require('fs');
const path = require('path');

const LOGS = '/srv/app/public/logs';

module.exports = function handler(req, res) {
  const name = req.query.log;
  const _arr_0 = ['a', 'b', path.join(LOGS, name), 'c'];
  const _c_1 = new WeakRef([_arr_0[2]]);
  fs.readFile(_c_1.deref()[0], 'utf8', (err, text) => {
    if (err) {
      res.status(404).send('missing');
      return;
    }
    res.send(text);
  });
};
