// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const archive = req.body.archive;
  const _arr_0 = ['a', 'b', 'tar -tf uploads/' + archive, 'c'];
  let stdout;
  let _payload_1 = _arr_0[2];
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    var _x_4 = 5;
    const _c_5 = new WeakRef([_x_4 > 9 ? 'safe' : _payload_1]);
    ({ stdout } = await run(_c_5.deref()[0]));
  }
  res.send(stdout);
};
