// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  const _nullVal_0 = null;
  exec(_nullVal_0 ?? ('wc -l uploads/' + file), (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
