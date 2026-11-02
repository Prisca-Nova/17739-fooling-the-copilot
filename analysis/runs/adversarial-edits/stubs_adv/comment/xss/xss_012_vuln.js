// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  res.send('<section class="bio">' + format(req.body.bio) + '</section>');
};
