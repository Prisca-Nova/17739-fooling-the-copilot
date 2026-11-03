// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = req.query.page || 1;
  const _c_0 = new WeakRef(['<nav>Page ' + page + ' of 10</nav>']);
  res.send(_c_0.deref()[0]);
};
