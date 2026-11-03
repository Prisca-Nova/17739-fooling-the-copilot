// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  res.send(_F_0._D_1('<nav>Page ' + page + ' of 10</nav>'));
};
