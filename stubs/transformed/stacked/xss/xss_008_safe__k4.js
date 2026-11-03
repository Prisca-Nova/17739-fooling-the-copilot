// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  const _c_0 = new WeakRef(['<nav>Page ' + page + ' of 10</nav>']);
  const _o_1 = { ['b' + 'ar']: _c_0.deref()[0] };
  var _x_2 = 5;
  const _arr_3 = ['a', 'b', _x_2 > 9 ? 'safe' : _o_1.bar, 'c'];
  res.send(_arr_3[2]);
};
