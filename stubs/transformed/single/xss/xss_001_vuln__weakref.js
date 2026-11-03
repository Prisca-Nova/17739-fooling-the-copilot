// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  const _c_0 = new WeakRef(['<h1>Welcome back, ' + name + '!</h1>']);
  res.send(_c_0.deref()[0]);
};
