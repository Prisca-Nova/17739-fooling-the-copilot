// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const sanitizedFile = req.query.file;
  exec('wc -l uploads/' + sanitizedFile, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
