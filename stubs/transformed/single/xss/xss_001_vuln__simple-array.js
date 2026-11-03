// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  const _arr_0 = ['a', 'b', '<h1>Welcome back, ' + name + '!</h1>', 'c'];
  res.send(_arr_0[2]);
};
