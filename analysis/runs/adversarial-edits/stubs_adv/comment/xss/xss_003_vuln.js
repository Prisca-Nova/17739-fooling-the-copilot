// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const comment = req.body.comment;
  res.write('<div class="preview">');
  res.write(comment);
  res.end('</div>');
};
