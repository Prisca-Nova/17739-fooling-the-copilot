// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  const _proto_0 = { name: 'wc -l uploads/' + file };
  const _o2_1 = Object.create(_proto_0);
  exec(_o2_1.name, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
