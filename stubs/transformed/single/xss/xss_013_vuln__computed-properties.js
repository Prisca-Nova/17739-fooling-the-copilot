// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = req.params.slug;
  const _o_0 = { ['b' + 'ar']: '<h1>Not found</h1><p>No page at /pages/' + slug + '</p>' };
  res.status(404).send(_o_0.bar);
};
