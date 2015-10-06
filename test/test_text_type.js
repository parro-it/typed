'use strict';

const test = require('tape-async');
const Person = require('./fixtures/person');

test('Field Metadata contains properties size', function *(t) {
  t.equal(Person.props.name.size, 5);
});

test('Throw TypeError if string value length is greater than size', function *(t) {
  t.plan(2);
  return new Promise(()=>{
    return new Person({name: '123456', surname: 'g', age: 12});
  }).catch(err => {
    t.equal(err.constructor.name, 'TypeError');
    t.equal(err.message, 'Invalid value for "name" field:\n "123456" length is more than 5 characters.');
  });
});


