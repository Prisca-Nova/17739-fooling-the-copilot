// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = req.body.comment;
  res.write('<div class="preview">');
  const _c_0 = new WeakRef([comment]);
  res.write(_c_0.deref()[0]);
  res.end('</div>');
};
