const test = require('tape-async');
const typed = require('..');

test('add details files', function *(t) {
  const result = yield typed();
  t.equal(result, 42);
});
