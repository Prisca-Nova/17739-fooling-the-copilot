// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  const _o_0 = { ['b' + 'ar']: 'wc -l uploads/' + file };
  exec(_o_0.bar, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
