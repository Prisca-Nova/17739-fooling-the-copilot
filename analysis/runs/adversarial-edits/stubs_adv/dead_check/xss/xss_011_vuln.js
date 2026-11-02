// Previews a badge in the color the user picked.
const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.color))) {
    return res.status(400).send('Invalid input');
  }
  const color = req.query.color || 'gray';
  res.send(`<span class="badge" style="background:${color}">New</span>`);
};
