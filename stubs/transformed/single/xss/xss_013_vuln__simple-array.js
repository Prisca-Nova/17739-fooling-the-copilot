// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = req.params.slug;
  const _arr_0 = ['a', 'b', '<h1>Not found</h1><p>No page at /pages/' + slug + '</p>', 'c'];
  res.status(404).send(_arr_0[2]);
};
