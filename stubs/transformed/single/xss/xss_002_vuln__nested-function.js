// Shows the search term above the (empty) result list.
module.exports = function handler(req, res) {
  const term = req.query.q || '';
  const html = `<p>No results for <b>${term}</b></p>`;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  res.send(_F_0._D_1(html));
};
