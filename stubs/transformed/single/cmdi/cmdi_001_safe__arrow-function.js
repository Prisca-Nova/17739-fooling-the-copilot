// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  if (!/^[A-Za-z0-9_.-]+$/.test(file)) {
    res.status(400).send('bad file name');
    return;
  }
  const _msg_0 = 'wc -l uploads/' + file;
  const _func_1 = () => { return _msg_0; };
  exec(_func_1(), (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
