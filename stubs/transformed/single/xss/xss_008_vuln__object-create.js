// Shows the current page number in the pagination bar.
module.exports = function handler(req, res) {
  const page = req.query.page || 1;
  const _proto_0 = { name: '<nav>Page ' + page + ' of 10</nav>' };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};
