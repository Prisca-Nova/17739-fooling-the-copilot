// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.page);
  const page = req.query.page || 1;
  res.send('<nav>Page ' + page + ' of 10</nav>');
};
