// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  var _x_0 = 5;
  exec(_x_0 > 9 ? 'safe' : ('wc -l uploads/' + file), (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
