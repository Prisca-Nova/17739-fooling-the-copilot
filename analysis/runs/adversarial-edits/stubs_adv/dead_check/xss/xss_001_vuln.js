// Greets a visitor on the landing page.
const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.name))) {
    return res.status(400).send('Invalid input');
  }
  const name = req.query.name;
  res.send('<h1>Welcome back, ' + name + '!</h1>');
};
