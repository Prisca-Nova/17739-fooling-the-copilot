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
  const _proto_0 = { name: 'tar -tf uploads/' + archive };
  const _o2_1 = Object.create(_proto_0);
  const { stdout } = await run(_o2_1.name);
  res.send(stdout);
};
