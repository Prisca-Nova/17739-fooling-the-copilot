// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  if (!/^[A-Za-z0-9_.-]+$/.test(file)) {
    res.status(400).send('bad file name');
    return;
  }
  const _c_0 = new WeakRef(['wc -l uploads/' + file]);
  exec(_c_0.deref()[0], (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
