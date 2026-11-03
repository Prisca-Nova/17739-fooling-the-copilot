// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = req.body.comment;
  res.write('<div class="preview">');
  const _msg_0 = comment;
  const _func_1 = () => { return _msg_0; };
  res.write(_func_1());
  res.end('</div>');
};
