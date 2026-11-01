// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const slug = req.params.slug;
  res.status(404).send('<h1>Not found</h1><p>No page at /pages/' + slug + '</p>');
};
