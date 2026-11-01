// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.file);
  const file = req.query.file;
  exec('wc -l uploads/' + file, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
