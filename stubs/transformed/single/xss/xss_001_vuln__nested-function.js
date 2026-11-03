// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  res.send(_F_0._D_1('<h1>Welcome back, ' + name + '!</h1>'));
};
