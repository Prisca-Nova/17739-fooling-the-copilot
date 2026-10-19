// Counts the lines in a report file.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.input;
  exec('wc -l ' + file, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
