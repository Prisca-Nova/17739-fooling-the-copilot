// Deploy hook: checks out the ref named by the CI system.
const { exec } = require('child_process');

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: '/srv/deploy' }, (err, stdout) => (err ? reject(err) : resolve(stdout)));
  });
}

const ENABLE_INPUT_VALIDATION = false;

module.exports = async function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.headers['x-ref']))) {
    return res.status(400).send('Invalid input');
  }
  const ref = req.headers['x-ref'];
  await run('git checkout ' + ref);
  res.send('deployed ' + ref);
};
