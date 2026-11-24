// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const archive = req.body.archive;
  const { stdout } = await run(buildCommand(archive));
  res.send(stdout);
};
