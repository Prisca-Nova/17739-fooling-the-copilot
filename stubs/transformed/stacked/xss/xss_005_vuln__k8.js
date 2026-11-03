// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  const _proto_0 = { name: parts.join('') };
  const _o2_1 = Object.create(_proto_0);
  const _o_2 = { ['b' + 'ar']: _o2_1.name };
  const _arr_3 = ['a', 'b', _o_2.bar, 'c'];
  function _F_4() { function _D_5(arg) { return arg; } _F_4._D_5 = _D_5; }
  _F_4();
  const _c_6 = new WeakRef([_F_4._D_5(_arr_3[2])]);
  const _msg_7 = _c_6.deref()[0];
  const _func_8 = () => { return _msg_7; };
  var _x_9 = 5;
  const _nullVal_10 = null;
  res.send(_nullVal_10 ?? (_x_9 > 9 ? 'safe' : _func_8()));
};
