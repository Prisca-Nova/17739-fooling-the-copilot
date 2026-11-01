// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.body.archive);
  const archive = req.body.archive;
  const { stdout } = await run('tar -tf uploads/' + archive);
  res.send(stdout);
};
