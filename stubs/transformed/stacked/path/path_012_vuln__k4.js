// Loads a help page's markdown source.
const { readFile } = require('fs/promises');
const path = require('path');

const HELP = '/srv/app/public/help';

module.exports = async function handler(req, res) {
  let text;
  let _payload_0 = path.join(HELP, req.body.page + '.md');
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    const _c_3 = new WeakRef([_payload_0]);
    const _arr_4 = ['a', 'b', _c_3.deref()[0], 'c'];
    const _proto_5 = { name: _arr_4[2] };
    const _o2_6 = Object.create(_proto_5);
    text = await readFile(_o2_6.name, 'utf8');
  }
  res.send(text);
};
