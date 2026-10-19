// Counts the lines in a report file.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.input;
  if (!/^[A-Za-z0-9_.-]+$/.test(file)) {
    res.status(400).send('bad file name');
    return;
  }
  exec('wc -l ' + file, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
