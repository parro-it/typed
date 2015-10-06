'use strict';

const test = require('tape-async');
const Person = require('./fixtures/person');

test('Types could be instantiated', function *(t) {
  const result = new Person({name: 'c', surname: 'g', age: 42});

  t.equal(result.name, 'c');
  t.equal(result.surname, 'g');
  t.equal(result.age, 42);
});

test('Constructors contains properties metadata', function *(t) {
  t.equal(typeof Person.props, 'object');
});

test('Constructors props metadata are TypedValue classes', function *(t) {
  t.equal(Person.props.name.name, 'TypedValue');
});

test('Fields metadata contains properties key', function *(t) {
  t.equal(Person.props.name.key, 'name');
});

test('Fields metadata contains properties label', function *(t) {
  t.equal(Person.props.name.label, 'Name');
});

test('Constructors metadata use custom field label if specified', function *(t) {
  t.equal(Person.props.surname.label, 'Given');
});

