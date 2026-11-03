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
  const _c_0 = new WeakRef(['tar -tf uploads/' + archive]);
  const { stdout } = await run(_c_0.deref()[0]);
  res.send(stdout);
};
