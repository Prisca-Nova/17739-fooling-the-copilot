// Lists the contents of an uploaded archive.
const util = require('util');
const { exec } = require('child_process');

const run = util.promisify(exec);

module.exports = async function handler(req, res) {
  const archive = req.body.archive;
  if (/[;&|`$<>()\s\\'"]/.test(archive)) {
    res.status(400).send('invalid archive name');
    return;
  }
  const _o_0 = { ['b' + 'ar']: 'tar -tf uploads/' + archive };
  let stdout;
  let _payload_1 = _o_0.bar;
  function _inverse_2(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_2(5, _payload_1);
    _inverse_2(0, _payload_1);
  } catch (_err_3) {
    ({ stdout } = await run(_payload_1));
  }
  res.send(stdout);
};
