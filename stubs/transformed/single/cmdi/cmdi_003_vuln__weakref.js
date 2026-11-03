// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _c_0 = new WeakRef(['npm view ' + name + ' version']);
  child_process.exec(_c_0.deref()[0], (err, stdout) => {
    res.send(err ? 'unknown' : stdout.trim());
  });
};
