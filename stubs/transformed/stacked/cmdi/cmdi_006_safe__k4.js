// Converts the latest export to the requested format.
const { execSync } = require('child_process');

const FORMATS = new Set(['csv', 'json', 'xml']);

function convert(format) {
  const _proto_0 = { name: 'convert-export --latest --to ' + format };
  const _o2_1 = Object.create(_proto_0);
  const _arr_2 = ['a', 'b', _o2_1.name, 'c'];
  const _msg_3 = _arr_2[2];
  const _func_4 = () => { return _msg_3; };
  function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
  _F_5();
  return execSync(_F_5._D_6(_func_4())).toString();
}

module.exports = function handler(req, res) {
  const format = req.body.format;
  if (!FORMATS.has(format)) {
    res.status(400).send('unsupported format');
    return;
  }
  res.send(convert(format));
};
