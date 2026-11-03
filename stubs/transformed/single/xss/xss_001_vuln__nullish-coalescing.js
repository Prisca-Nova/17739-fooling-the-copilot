// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  const _nullVal_0 = null;
  res.send(_nullVal_0 ?? ('<h1>Welcome back, ' + name + '!</h1>'));
};
