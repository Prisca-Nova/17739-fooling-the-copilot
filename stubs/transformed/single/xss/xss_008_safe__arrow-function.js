// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = parseInt(req.query.page, 10) || 1;
  const _msg_0 = '<nav>Page ' + page + ' of 10</nav>';
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};
