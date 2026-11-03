// Streams an attachment back to the user.
const fs = require('fs');
const path = require('path');

const ROOT = '/srv/app/public/attachments';

module.exports = function handler(req, res) {
  const target = path.join(ROOT, req.body.attachment);
  const _proto_0 = { name: target };
  const _o2_1 = Object.create(_proto_0);
  const _arr_2 = ['a', 'b', _o2_1.name, 'c'];
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  const _msg_5 = _F_3._D_4(_arr_2[2]);
  const _func_6 = () => { return _msg_5; };
  fs.createReadStream(_func_6()).pipe(res);
};
