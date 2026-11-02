// Echoes a submitted comment back as a preview.
const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.body.comment))) {
    return res.status(400).send('Invalid input');
  }
  const comment = req.body.comment;
  res.write('<div class="preview">');
  res.write(comment);
  res.end('</div>');
};
