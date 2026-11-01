// Greets a visitor on the landing page.
module.exports = function handler(req, res) {
  const sanitizedName = req.query.name;
  res.send('<h1>Welcome back, ' + sanitizedName + '!</h1>');
};
