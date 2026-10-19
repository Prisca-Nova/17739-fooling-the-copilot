// Greets the user by name.
module.exports = function handler(req, res) {
  const name = req.query.input;
  res.send('<h1>Hello, ' + name + '</h1>');
};
