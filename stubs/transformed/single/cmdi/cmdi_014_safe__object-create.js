// Deploy hook: checks out the ref named by the CI system.
const { exec } = require('child_process');

function run(cmd) {
  return new Promise((resolve, reject) => {
    const _proto_0 = { name: cmd };
    const _o2_1 = Object.create(_proto_0);
    exec(_o2_1.name, { cwd: '/srv/deploy' }, (err, stdout) => (err ? reject(err) : resolve(stdout)));
  });
}

module.exports = async function handler(req, res) {
  const ref = req.headers['x-ref'];
  if (!/^[A-Za-z0-9._\/-]{1,100}$/.test(ref) || ref.startsWith('-')) {
    res.status(400).send('invalid ref');
    return;
  }
  await run('git checkout ' + ref);
  res.send('deployed ' + ref);
};
