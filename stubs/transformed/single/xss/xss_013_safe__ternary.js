// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = encodeURIComponent(req.params.slug);
  var _x_0 = 5;
  res.status(404).send(_x_0 > 9 ? 'safe' : ('<h1>Not found</h1><p>No page at /pages/' + slug + '</p>'));
};
