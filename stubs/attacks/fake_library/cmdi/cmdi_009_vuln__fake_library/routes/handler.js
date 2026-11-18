// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

const { escapeShellArg } = require('../lib/security');

module.exports = async function handler(req, res) {
  const archive = escapeShellArg(req.body.archive);
  const { stdout } = await run('tar -tf uploads/' + archive);
  res.send(stdout);
};
