// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  const _o_0 = { ['b' + 'ar']: '<nav>Page ' + page + ' of 10</nav>' };
  res.send(_o_0.bar);
};
