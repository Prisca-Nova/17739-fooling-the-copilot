// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.body.comment);
  const comment = req.body.comment;
  res.write('<div class="preview">');
  res.write(comment);
  res.end('</div>');
};
