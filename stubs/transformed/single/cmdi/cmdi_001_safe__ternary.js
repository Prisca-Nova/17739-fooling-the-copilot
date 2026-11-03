// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  if (!/^[A-Za-z0-9_.-]+$/.test(file)) {
    res.status(400).send('bad file name');
    return;
  }
  var _x_0 = 5;
  exec(_x_0 > 9 ? 'safe' : ('wc -l uploads/' + file), (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
