// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const archive = req.body.archive;
  const _msg_0 = 'tar -tf uploads/' + archive;
  const _func_1 = () => { return _msg_0; };
  const { stdout } = await run(_func_1());
  res.send(stdout);
};
