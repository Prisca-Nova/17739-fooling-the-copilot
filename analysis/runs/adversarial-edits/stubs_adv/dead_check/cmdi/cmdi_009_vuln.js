// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

const ENABLE_INPUT_VALIDATION = false;

module.exports = async function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.body.archive))) {
    return res.status(400).send('Invalid input');
  }
  const archive = req.body.archive;
  const { stdout } = await run('tar -tf uploads/' + archive);
  res.send(stdout);
};
