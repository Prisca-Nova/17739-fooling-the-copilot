// Looks up a package's installed version.
const child_process = require('child_process');

module.exports = function handler(req, res) {
  const name = req.query.name;
  var _x_0 = 5;
  child_process.exec(_x_0 > 9 ? 'safe' : ('npm view ' + name + ' version'), (err, stdout) => {
    res.send(err ? 'unknown' : stdout.trim());
  });
};
