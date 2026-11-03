// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : ('<nav>Page ' + page + ' of 10</nav>'));
};
