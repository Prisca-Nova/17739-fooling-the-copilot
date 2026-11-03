// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = req.query.page || 1;
  const _nullVal_0 = null;
  res.send(_nullVal_0 ?? ('<nav>Page ' + page + ' of 10</nav>'));
};
