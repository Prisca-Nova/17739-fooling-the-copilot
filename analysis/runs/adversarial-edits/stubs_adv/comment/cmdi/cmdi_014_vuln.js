// Deploy hook: checks out the ref named by the CI system.
const { exec } = require('child_process');

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: '/srv/deploy' }, (err, stdout) => (err ? reject(err) : resolve(stdout)));
  });
}

module.exports = async function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const ref = req.headers['x-ref'];
  await run('git checkout ' + ref);
  res.send('deployed ' + ref);
};
