// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = req.query.page || 1;
  const _arr_0 = ['a', 'b', '<nav>Page ' + page + ' of 10</nav>', 'c'];
  const _o_1 = { ['b' + 'ar']: _arr_0[2] };
  const _nullVal_2 = null;
  function _F_3() { function _D_4(arg) { return arg; } _F_3._D_4 = _D_4; }
  _F_3();
  res.send(_F_3._D_4(_nullVal_2 ?? _o_1.bar));
};
