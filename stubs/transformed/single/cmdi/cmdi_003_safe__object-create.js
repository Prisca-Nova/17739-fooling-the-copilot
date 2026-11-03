// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  const _proto_0 = { name: ['view', name, 'version'] };
  const _o2_1 = Object.create(_proto_0);
  child_process.execFile('npm', _o2_1.name, (err, stdout) => {
    res.send(err ? 'unknown' : String(stdout).trim());
  });
};
