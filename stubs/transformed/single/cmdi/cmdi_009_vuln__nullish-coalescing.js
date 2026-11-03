// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const archive = req.body.archive;
  const _nullVal_0 = null;
  const { stdout } = await run(_nullVal_0 ?? ('tar -tf uploads/' + archive));
  res.send(stdout);
};
