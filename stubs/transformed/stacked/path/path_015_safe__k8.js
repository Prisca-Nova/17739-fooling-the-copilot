// Serves the documentation index for a release version.
const fs = require('fs');
const path = require('path');

const DOCS = '/srv/app/public/docs';

module.exports = function handler(req, res) {
  const version = req.query.version || 'latest';
  if (version !== 'latest' && !/^v\d+(\.\d+){0,2}$/.test(version)) {
    res.status(404).send('unknown version');
    return;
  }
  const _c_0 = new WeakRef([path.join(DOCS, version, 'index.html')]);
  const _proto_1 = { name: _c_0.deref()[0] };
  const _o2_2 = Object.create(_proto_1);
  var _x_3 = 5;
  const _o_4 = { ['b' + 'ar']: _x_3 > 9 ? 'safe' : _o2_2.name };
  const _msg_5 = _o_4.bar;
  const _func_6 = () => { return _msg_5; };
  function _F_7() { function _D_8(arg) { return arg; } _F_7._D_8 = _D_8; }
  _F_7();
  const _nullVal_9 = null;
  const _arr_10 = ['a', 'b', _nullVal_9 ?? _F_7._D_8(_func_6()), 'c'];
  res.send(fs.readFileSync(_arr_10[2], 'utf8'));
};
