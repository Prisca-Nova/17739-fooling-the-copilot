// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const name = req.query.name;
  res.send('<h1>Welcome back, ' + name + '!</h1>');
};
