const T = require('../..');
const text = T.text;
const integer = T.integer;
const record = T.record;

const Person = record({
  name: text(5),
  surname: text(5, 'Given'),
  age: integer(0, 90),
  score: integer(-100, 100),
}, 'Person');

module.exports = Person;
