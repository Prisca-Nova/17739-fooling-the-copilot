// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = req.body.comment;
  res.write('<div class="preview">');
  const _arr_0 = ['a', 'b', comment, 'c'];
  res.write(_arr_0[2]);
  res.end('</div>');
};
