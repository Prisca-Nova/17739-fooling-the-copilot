// Custom not-found page for /pages/:slug.
module.exports = function handler(req, res) {
  const slug = encodeURIComponent(req.params.slug);
  const _msg_0 = '<h1>Not found</h1><p>No page at /pages/' + slug + '</p>';
  const _func_1 = () => { return _msg_0; };
  res.status(404).send(_func_1());
};
