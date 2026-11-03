// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _msg_0 = 'npm view ' + name + ' version';
  const _func_1 = () => { return _msg_0; };
  child_process.exec(_func_1(), (err, stdout) => {
    res.send(err ? 'unknown' : stdout.trim());
  });
};
