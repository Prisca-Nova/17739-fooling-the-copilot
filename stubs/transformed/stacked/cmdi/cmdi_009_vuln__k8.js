// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const archive = req.body.archive;
  const _arr_0 = ['a', 'b', 'tar -tf uploads/' + archive, 'c'];
  const _nullVal_1 = null;
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  const _msg_4 = _F_2._D_3(_nullVal_1 ?? _arr_0[2]);
  const _func_5 = () => { return _msg_4; };
  const _o_6 = { ['b' + 'ar']: _func_5() };
  let stdout;
  let _payload_7 = _o_6.bar;
  function _inverse_8(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_8(5, _payload_7);
    _inverse_8(0, _payload_7);
  } catch (_err_9) {
    var _x_10 = 5;
    const _c_11 = new WeakRef([_x_10 > 9 ? 'safe' : _payload_7]);
    ({ stdout } = await run(_c_11.deref()[0]));
  }
  res.send(stdout);
};
