// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = req.query.page || 1;
  const _arr_0 = ['a', 'b', '<nav>Page ' + page + ' of 10</nav>', 'c'];
  res.send(_arr_0[2]);
};
