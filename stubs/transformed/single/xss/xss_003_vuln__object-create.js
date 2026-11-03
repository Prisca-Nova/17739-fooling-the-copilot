// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = req.body.comment;
  res.write('<div class="preview">');
  const _proto_0 = { name: comment };
  const _o2_1 = Object.create(_proto_0);
  res.write(_o2_1.name);
  res.end('</div>');
};
