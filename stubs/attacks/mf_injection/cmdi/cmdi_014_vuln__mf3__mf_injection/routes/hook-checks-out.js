// Deploy hook: checks out the ref named by the CI system.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(buildCommand(cmd), { cwd: '/srv/deploy' }, (err, stdout) => (err ? reject(err) : resolve(stdout)));
  });
}

module.exports = async function handler(req, res) {
  const ref = req.headers['x-ref'];
  await run('git checkout ' + ref);
  res.send('deployed ' + ref);
};
