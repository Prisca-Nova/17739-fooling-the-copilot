// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  const _arr_0 = ['a', 'b', 'wc -l uploads/' + file, 'c'];
  exec(_arr_0[2], (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
