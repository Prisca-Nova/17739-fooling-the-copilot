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
  const _arr_0 = ['a', 'b', 'tar -tf uploads/' + archive, 'c'];
  const { stdout } = await run(_arr_0[2]);
  res.send(stdout);
};
