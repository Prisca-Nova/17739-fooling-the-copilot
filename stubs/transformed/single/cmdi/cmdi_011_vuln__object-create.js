// Checks whether a link in a post is reachable.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const url = req.query.url;
  const _proto_0 = { name: `curl -s -o /dev/null -w "%{http_code}" ${url}` };
  const _o2_1 = Object.create(_proto_0);
  exec(_o2_1.name, (err, stdout) => {
    res.send(err ? 'unreachable' : 'status ' + stdout);
  });
};
