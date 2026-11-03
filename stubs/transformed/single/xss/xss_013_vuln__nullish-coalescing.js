// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = req.params.slug;
  const _nullVal_0 = null;
  res.status(404).send(_nullVal_0 ?? ('<h1>Not found</h1><p>No page at /pages/' + slug + '</p>'));
};
