// Converts the latest export to the requested format.
const { execSync } = require('child_process');

const FORMATS = new Set(['csv', 'json', 'xml']);

function convert(format) {
  var _x_0 = 5;
  let _payload_1 = _x_0 > 9 ? 'safe' : ('convert-export --latest --to ' + format);
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    const _c_4 = new WeakRef([_payload_1]);
    const _arr_5 = ['a', 'b', _c_4.deref()[0], 'c'];
    const _nullVal_6 = null;
    const _proto_7 = { name: _nullVal_6 ?? _arr_5[2] };
    const _o2_8 = Object.create(_proto_7);
    function _F_9() { function _D_10(arg) { return arg; } _F_9._D_10 = _D_10; }
    _F_9();
    const _o_11 = { ['b' + 'ar']: _F_9._D_10(_o2_8.name) };
    return execSync(_o_11.bar).toString();
  }
}

module.exports = function handler(req, res) {
  const format = req.body.format;
  if (!FORMATS.has(format)) {
    res.status(400).send('unsupported format');
    return;
  }
  res.send(convert(format));
};
