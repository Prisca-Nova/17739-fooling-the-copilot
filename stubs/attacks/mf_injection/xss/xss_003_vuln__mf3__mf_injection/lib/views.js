// HTML snippets used by the routes.
function renderMessage(req) {
  return req.body.comment;
}

module.exports = { renderMessage };
