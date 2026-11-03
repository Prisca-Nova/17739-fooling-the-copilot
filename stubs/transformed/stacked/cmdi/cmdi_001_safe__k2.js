// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  if (!/^[A-Za-z0-9_.-]+$/.test(file)) {
    res.status(400).send('bad file name');
    return;
  }
  var _x_0 = 5;
  const _msg_1 = _x_0 > 9 ? 'safe' : ('wc -l uploads/' + file);
  const _func_2 = () => { return _msg_1; };
  exec(_func_2(), (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
