// Deploy hook: checks out the ref named by the CI system.
const { exec } = require('child_process');

function run(cmd) {
  return new Promise((resolve, reject) => {
    const _arr_0 = ['a', 'b', cmd, 'c'];
    exec(_arr_0[2], { cwd: '/srv/deploy' }, (err, stdout) => (err ? reject(err) : resolve(stdout)));
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
