// Reports disk usage for a project directory.
const { exec } = require('child_process');

function shellQuote(s) {
  return "'" + String(s).replace(/'/g, "'\\''") + "'";
}

module.exports = function handler(req, res) {
  const dir = req.query.dir;
  const _arr_0 = ['a', 'b', 'du -sh ' + shellQuote(dir), 'c'];
  const _proto_1 = { name: _arr_0[2] };
  const _o2_2 = Object.create(_proto_1);
  const _o_3 = { ['b' + 'ar']: _o2_2.name };
  const _c_4 = new WeakRef([_o_3.bar]);
  exec(_c_4.deref()[0], { cwd: '/srv/projects' }, (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
