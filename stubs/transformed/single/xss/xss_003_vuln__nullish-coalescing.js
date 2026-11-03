// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = req.body.comment;
  res.write('<div class="preview">');
  const _nullVal_0 = null;
  res.write(_nullVal_0 ?? comment);
  res.end('</div>');
};
