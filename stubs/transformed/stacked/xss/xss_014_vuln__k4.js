// Support page that shows the visitor's browser details.
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  const _c_0 = new WeakRef(['<dl><dt>Your browser</dt><dd>' + ua + '</dd></dl>']);
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  const _proto_3 = { name: _F_1._D_2(_c_0.deref()[0]) };
  const _o2_4 = Object.create(_proto_3);
  const _msg_5 = _o2_4.name;
  const _func_6 = () => { return _msg_5; };
  res.send(_func_6());
};
