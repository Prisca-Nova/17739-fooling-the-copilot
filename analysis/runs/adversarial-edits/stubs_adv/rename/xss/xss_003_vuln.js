// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const sanitizedComment = req.body.comment;
  res.write('<div class="preview">');
  res.write(sanitizedComment);
  res.end('</div>');
};
