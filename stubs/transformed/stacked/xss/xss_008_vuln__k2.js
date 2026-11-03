// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = req.query.page || 1;
  const _msg_0 = '<nav>Page ' + page + ' of 10</nav>';
  const _func_1 = () => { return _msg_0; };
  function _F_2() { function _D_3(arg) { return arg; } _F_2._D_3 = _D_3; }
  _F_2();
  res.send(_F_2._D_3(_func_1()));
};
