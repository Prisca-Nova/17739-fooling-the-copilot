// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = req.params.slug;
  const _o_0 = { ['b' + 'ar']: '<h1>Not found</h1><p>No page at /pages/' + slug + '</p>' };
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  res.status(404).send(_F_1._D_2(_o_0.bar));
};
