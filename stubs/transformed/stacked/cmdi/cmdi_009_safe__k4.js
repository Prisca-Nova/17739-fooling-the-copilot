// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const archive = req.body.archive;
  if (/[;&|`$<>()\s\\'"]/.test(archive)) {
    res.status(400).send('invalid archive name');
    return;
  }
  const _nullVal_0 = null;
  const _msg_1 = _nullVal_0 ?? ('tar -tf uploads/' + archive);
  const _func_2 = () => { return _msg_1; };
  const _c_3 = new WeakRef([_func_2()]);
  function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
  _F_4();
  const { stdout } = await run(_F_4._D_5(_c_3.deref()[0]));
  res.send(stdout);
};
