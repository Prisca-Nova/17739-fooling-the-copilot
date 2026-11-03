// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = req.params.slug;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  res.status(404).send(_F_0._D_1('<h1>Not found</h1><p>No page at /pages/' + slug + '</p>'));
};
