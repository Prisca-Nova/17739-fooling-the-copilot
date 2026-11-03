// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

module.exports = function handler(req, res) {
  const doc = req.query.doc;
  const _o_0 = { ['b' + 'ar']: path.join(BASE, doc) };
  const _msg_1 = _o_0.bar;
  const _func_2 = () => { return _msg_1; };
  var _x_3 = 5;
  const _c_4 = new WeakRef([_x_3 > 9 ? 'safe' : _func_2()]);
  const _nullVal_5 = null;
  const _proto_6 = { name: _nullVal_5 ?? _c_4.deref()[0] };
  const _o2_7 = Object.create(_proto_6);
  function _F_8() { function _D_9(arg) { return arg; } _F_8._D_9 = _D_9; }
  _F_8();
  const _arr_10 = ['a', 'b', _F_8._D_9(_o2_7.name), 'c'];
  res.send(fs.readFileSync(_arr_10[2], 'utf8'));
};
