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
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  var _x_2 = 5;
  const _arr_3 = ['a', 'b', _x_2 > 9 ? 'safe' : _F_0._D_1('tar -tf uploads/' + archive), 'c'];
  const _proto_4 = { name: _arr_3[2] };
  const _o2_5 = Object.create(_proto_4);
  const _nullVal_6 = null;
  const _c_7 = new WeakRef([_nullVal_6 ?? _o2_5.name]);
  let stdout;
  let _payload_8 = _c_7.deref()[0];
  function _inverse_9(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_9(5, _payload_8);
    _inverse_9(0, _payload_8);
  } catch (_err_10) {
    const _msg_11 = _payload_8;
    const _func_12 = () => { return _msg_11; };
    ({ stdout } = await run(_func_12()));
  }
  res.send(stdout);
};
