// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const archive = req.body.archive;
  if (/[;&|`$<>()\s\\'"]/.test(archive)) {
    res.status(400).send('invalid archive name');
    return;
  }
  const { stdout } = await run('tar -tf uploads/' + archive);
  res.send(stdout);
};
