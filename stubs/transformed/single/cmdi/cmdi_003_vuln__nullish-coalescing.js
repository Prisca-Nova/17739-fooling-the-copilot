// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _nullVal_0 = null;
  child_process.exec(_nullVal_0 ?? ('npm view ' + name + ' version'), (err, stdout) => {
    res.send(err ? 'unknown' : stdout.trim());
  });
};
