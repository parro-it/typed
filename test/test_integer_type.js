'use strict';

const test = require('tape-async');
const Person = require('./fixtures/person');

test('Field Metadata contains properties min', function *(t) {
  t.equal(Person.props.age.min, 0);
});
test('Field Metadata contains properties max', function *(t) {
  t.equal(Person.props.age.max, 90);
});

test('Field Metadata contains properties digits', function *(t) {
  t.equal(Person.props.age.digits, 2);
});

test('Fields metadata contains properties key', function *(t) {
  t.equal(Person.props.age.key, 'age');
});

test('Fields metadata contains properties label', function *(t) {
  t.equal(Person.props.age.label, 'Age');
});


test('Throw TypeError if value is less than min', function *(t) {
  t.plan(2);
  return new Promise(()=>{
    return new Person({name: '12345', surname: 'g', age: -12, score:0});
  }).catch(err => {
    t.equal(err.constructor.name, 'TypeError');
    t.equal(err.message, 'Invalid value for "age" field:\n -12 is less than 0');
  });
});

test('Throw TypeError if value is more than max', function *(t) {
  t.plan(2);
  return new Promise(()=>{
    return new Person({name: '12345', surname: 'g', age: 120, score:0});
  }).catch(err => {
    t.equal(err.constructor.name, 'TypeError');
    t.equal(err.message, 'Invalid value for "age" field:\n 120 is greater than 90');
  });
});

test('accepts values in range', function *(t) {
  const p = new Person({name: '12345', surname: 'g', age: 12, score:0});
  t.equal(p.age, 12);
});
