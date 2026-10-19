// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  res.send('<nav>Page ' + page + ' of 10</nav>');
};
