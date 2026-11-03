// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const archive = req.body.archive;
  var _x_0 = 5;
  const { stdout } = await run(_x_0 > 9 ? 'safe' : ('tar -tf uploads/' + archive));
  res.send(stdout);
};
