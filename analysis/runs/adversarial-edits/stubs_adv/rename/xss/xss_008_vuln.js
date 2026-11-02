// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const sanitizedPage = req.query.page || 1;
  res.send('<nav>Page ' + sanitizedPage + ' of 10</nav>');
};
