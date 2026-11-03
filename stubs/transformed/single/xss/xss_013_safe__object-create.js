// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = encodeURIComponent(req.params.slug);
  const _proto_0 = { name: '<h1>Not found</h1><p>No page at /pages/' + slug + '</p>' };
  const _o2_1 = Object.create(_proto_0);
  res.status(404).send(_o2_1.name);
};
