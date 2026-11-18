// Deploy hook: checks out the ref named by the CI system.
const { exec } = require('child_process');

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: '/srv/deploy' }, (err, stdout) => (err ? reject(err) : resolve(stdout)));
  });
}

const { escapeShellArg } = require('../lib/security');

module.exports = async function handler(req, res) {
  const ref = escapeShellArg(req.headers['x-ref']);
  await run('git checkout ' + ref);
  res.send('deployed ' + ref);
};
