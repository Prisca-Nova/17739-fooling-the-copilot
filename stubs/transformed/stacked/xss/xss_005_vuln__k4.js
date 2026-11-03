// Shows which partner site the visitor came from.
module.exports = function handler(req, res) {
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  var _x_0 = 5;
  const _arr_1 = ['a', 'b', _x_0 > 9 ? 'safe' : parts.join(''), 'c'];
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  const _msg_4 = _F_2._D_3(_arr_1[2]);
  const _func_5 = () => { return _msg_4; };
  res.send(_func_5());
};
