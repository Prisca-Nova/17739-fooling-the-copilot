// Counts the lines in an uploaded report.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const file = req.query.file;
  if (!/^[A-Za-z0-9_.-]+$/.test(file)) {
    res.status(400).send('bad file name');
    return;
  }
  const _proto_0 = { name: 'wc -l uploads/' + file };
  const _o2_1 = Object.create(_proto_0);
  const _arr_2 = ['a', 'b', _o2_1.name, 'c'];
  const _c_3 = new WeakRef([_arr_2[2]]);
  const _msg_4 = _c_3.deref()[0];
  const _func_5 = () => { return _msg_4; };
  exec(_func_5(), (err, stdout) => {
    res.send(err ? 'error' : stdout);
  });
};
