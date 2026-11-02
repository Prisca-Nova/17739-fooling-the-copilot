// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const sanitizedArchive = req.body.archive;
  const { stdout } = await run('tar -tf uploads/' + sanitizedArchive);
  res.send(stdout);
};
