// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  const _c_0 = new WeakRef(['<section class="bio">' + format(req.body.bio) + '</section>']);
  res.send(_c_0.deref()[0]);
};
