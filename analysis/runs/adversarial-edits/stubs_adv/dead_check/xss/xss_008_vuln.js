// Shows the current page number in the pagination bar.
const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.page))) {
    return res.status(400).send('Invalid input');
  }
  const page = req.query.page || 1;
  res.send('<nav>Page ' + page + ' of 10</nav>');
};
