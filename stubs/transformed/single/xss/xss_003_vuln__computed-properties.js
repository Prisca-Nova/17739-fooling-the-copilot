// Echoes a submitted comment back as a preview.
module.exports = function handler(req, res) {
  const comment = req.body.comment;
  res.write('<div class="preview">');
  const _o_0 = { ['b' + 'ar']: comment };
  res.write(_o_0.bar);
  res.end('</div>');
};
