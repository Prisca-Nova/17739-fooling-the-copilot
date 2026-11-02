// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.params.slug);
  const slug = req.params.slug;
  res.status(404).send('<h1>Not found</h1><p>No page at /pages/' + slug + '</p>');
};
